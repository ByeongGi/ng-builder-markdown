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
    // Arguments to TestingArchitectHost are workspace and current directories.
    // Since we don't use those, both are the same in this case.

    architectHost = new TestingArchitectHost(projectRoot, projectRoot);
    architect = new Architect(architectHost, registry);


    // This will either take a Node package name, or a path to the directory
    // for the package.json file.
    await architectHost.addBuilderFromPackage(projectRoot);
    console.log('##', Array.from((architectHost as any)._builderMap.keys()));
  });

  // This might not work in Windows.
  it('Markdown File을 읽어 변환하여 File의 정보를 가져온다 ', async (done) => {
    const logger = new logging.Logger('ng-markdown:markdown');
    const logs: LogEntry[] = [];
    logger.subscribe((ev) => {
      logs.push(ev);
    });

    // A "run" can contain multiple outputs, and contains progress information.
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

    // We pass the logger for checking later.
    // The "result" member is the next output of the runner.
    // This is of type BuilderOutput.
    const output = await run.result;
    logs.forEach((ev) => {
      if (ev.message === NGMarkdownEvent.FILE_INFO_RESULT
          && ev.data) {
        const fileInfoList = JSON.parse(ev.data.toString());
        expect(fileInfoList.length).toBeGreaterThan(0);
      }
    });
    await run.stop();

    expect(output.success).toBe(true);
    done();
  }, 1000000);
});
