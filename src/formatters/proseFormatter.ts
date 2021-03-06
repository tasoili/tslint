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

/// <reference path='abstractFormatter.ts' />

module Lint.Formatters {

    export class ProseFormatter extends AbstractFormatter {
        constructor() {
            super("prose");
        }

        public format(failures: Lint.RuleFailure[]): string {
            var output = "";
            for (var i = 0; i < failures.length; ++i) {
                var failure = failures[i];
                var fileName = failure.getFileName();
                var failureString = failure.getFailure();

                var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
                var line = lineAndCharacter.line() + 1;
                var character = lineAndCharacter.character() + 1;

                output += fileName + "[" + line + ", " + character + "]: " + failureString + "\n";
            }
            return output;
        }
    }

}
