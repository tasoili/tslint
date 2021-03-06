/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

/// <reference path='../references.ts' />

describe("JSON Formatter", () => {
    var TEST_FILE = "formatters/jsonFormatter.test.ts";
    var syntaxTree, formatter;

    before(function() {
        syntaxTree = Lint.Test.getSyntaxTree(TEST_FILE);
        formatter = new Lint.Formatters.JsonFormatter();
    });

    it("formats failures", () => {
        var maxPosition = syntaxTree.sourceUnit().fullWidth();

        var failures = [
            new Lint.RuleFailure(syntaxTree, 0, 1, "first failure"),
            new Lint.RuleFailure(syntaxTree, maxPosition - 1, maxPosition, "last failure"),
            new Lint.RuleFailure(syntaxTree, 0, maxPosition, "full failure")
        ];

        var expectedResult = [{
            name: TEST_FILE,
            failure: "first failure",
            startPosition: {
                position: 0,
                line: 0,
                character: 0
            },
            endPosition: {
                position: 1,
                line: 0,
                character: 1
            }
        },
        {
            name: TEST_FILE,
            failure: "last failure",
            startPosition: {
                position: maxPosition - 1,
                line: 5,
                character: 2
            },
            endPosition: {
                position: maxPosition,
                line: 6,
                character: 0
            }
        },
        {
            name: TEST_FILE,
            failure: "full failure",
            startPosition: {
                position: 0,
                line: 0,
                character: 0
            },
            endPosition: {
                position: maxPosition,
                line: 6,
                character: 0
            }
        }];

        var actualResult = JSON.parse(formatter.format(failures));
        assert.deepEqual(actualResult, expectedResult);
    });

    it("handles no failures", () => {
        var result = JSON.parse(formatter.format([]));
        assert.deepEqual(result, []);
    });
});
