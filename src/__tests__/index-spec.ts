import {Architect} from '@angular-devkit/architect';
import {TestingArchitectHost} from '@angular-devkit/architect/testing';
import {logging, normalize, schema} from '@angular-devkit/core';
import { Options } from '../builders/model/model';

const {join} = require('path');
const projectRoot = normalize(process.cwd());

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
    await architectHost.addBuilderFromPackage(join(projectRoot, '.'));
    console.log('#', Array.from((architectHost as any)._builderMap.keys()));
  });

  // This might not work in Windows.
  it('can run ls', async (done) => {
    // Create a logger that keeps an array of all messages that were logged.
    const logger = new logging.Logger('ng-markdown:markdown');
    // const logs: string[] = [];
    logger.subscribe((ev: { message: string; }) => console.log(ev));

    // A "run" can contain multiple outputs, and contains progress information.

    const run = await architect.scheduleBuilder('ng-markdown:markdown', <Options>{
      input: './markdown',
      output: { hash : false},
      converter: {
        transform : 'src/builders/converter/coverter.ts'
      }

    }, {logger});  // We pass the logger for checking later.

    // The "result" member is the next output of the runner.
    // This is of type BuilderOutput.
    const output = await run.result;
    console.log(output);

    // Stop the builder from running. This really stops Architect from keeping
    // the builder associated states in memory, since builders keep waiting
    // to be scheduled.

    setTimeout(async () => {
      await run.stop();
      done();
    }, 200000000);


    // Expect that it succeeded.
    // expect(output.success).toBe(true);

    // Expect that this file was listed. It should be since we're running
    // `ls $__dirname`.
    // expect(logs.toString()).toContain('index-spec.ts');
  }, 999999999);
});
