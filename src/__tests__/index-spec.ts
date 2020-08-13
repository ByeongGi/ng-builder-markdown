import {Architect} from '@angular-devkit/architect';
import {TestingArchitectHost} from '@angular-devkit/architect/testing';
import {getSystemPath, logging, normalize, schema} from '@angular-devkit/core';
import {Options} from '../builders/model';
import {NGMarkdownEvent} from '../builders/contants';
import {LogEntry} from '@angular-devkit/core/src/logger';


const projectRoot = getSystemPath(normalize(process.cwd()));

describe('Command Runner Builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;


  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);
    architectHost = new TestingArchitectHost(projectRoot, projectRoot);
    architect = new Architect(architectHost, registry);
    await architectHost.addBuilderFromPackage(projectRoot);
    console.log('##', Array.from((architectHost as any)._builderMap.keys()));
  });

  it('Markdown File을 읽어 변환하여 File의 정보를 가져온다', async (done) => {
    const logger = new logging.Logger('ng-markdown:markdown');
    const logs: LogEntry[] = [];
    logger.subscribe((ev) => {
      logs.push(ev);
    });

    const run = await architect.scheduleBuilder('ng-markdown:markdown', <Options>{
      input: './src/__tests__/markdown',
      output: {
        hash: false,
        name: 'TEST',
        path: '.data'
      },
      converter: {
        transform: './src/__tests__/converter.ts'
      }

    }, {logger});
    const output = await run.result;
    logs.forEach((ev) => {
      if (ev.message === NGMarkdownEvent.FILE_INFO_SUCCESS
          && ev.data) {
        const fileInfoList = JSON.parse(ev.data.toString());
        expect(fileInfoList.length).toBeGreaterThan(0);
      }
    });
    await run.stop();

    expect(output.success).toBe(true);
    done();
  }, 100000);
});
