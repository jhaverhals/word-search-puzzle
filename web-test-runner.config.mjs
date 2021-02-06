import {esbuildPlugin} from '@web/dev-server-esbuild';
import {defaultReporter} from '@web/test-runner';
import {junitReporter} from '@web/test-runner-junit-reporter';

export default {
  coverage: false,
  esbuildTarget: 'auto',
  files: ['src/**/*.test.ts'],
  nodeResolve: true,
  plugins: [esbuildPlugin({ts:true, target: 'auto'})],
  reporters: [
    // use the default reporter only for reporting test progress
    defaultReporter({ reportTestResults: false, reportTestProgress: true }),
    // use another reporter to report test results
    junitReporter({
      outputPath: './test-results/test-results.xml', // default `'./test-results.xml'`
      reportLogs: true, // default `false`
    }),
  ],
}