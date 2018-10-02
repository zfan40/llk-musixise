/**
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Blockly from "node-blockly/browser";
// Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
// Blockly.JavaScript.addReservedWords("highlightBlock");
// let workspace = Blockly.getMainWorkspace();
// function highlightBlock(id) {
//   workspace.highlightBlock(id);
// }
/***************** new methods (simpler)*********************/
Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_with_notes",
    // message0: "五线谱音符小节",
    // args0: [
    // {
    //   type: "input_value",
    //   name: "TIMBRE",
    //   check: "String"
    // },
    // {
    //   type: "input_value",
    //   name: "TEMPO",
    //   check: "Number"
    // },
    // {
    //   type: "input_value",
    //   name: "VOLUMN",
    //   check: "Number"
    // },
    // {
    //   type: "input_value",
    //   name: "METRE",
    //   check: "String"
    // }
    // ],
    message0: "小节 %1",
    args0: [{ type: "input_statement", name: "measures" }],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 155,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure_with_notes"] = function(block) {
  // Do while/until loop.
  // const [timbre, measure, volumn, metre] = [
  //   "TIMBRE",
  //   "TEMPO",
  //   "VOLUMN",
  //   "METRE"
  // ].map(item =>
  //   Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  // );
  var branch = Blockly.JavaScript.statementToCode(block, "measures");
  return `
  createMeasureWithNote();
  ${branch};
  `;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_note",
    message0: "产生 %1 音高%2",
    args0: [
      {
        type: "field_dropdown",
        name: "NOTE_LEN",
        options: [
          [
            {
              src: "/static/stave/note0.5.png",
              width: 9,
              height: 19,
              alt: "half"
            },
            "half"
          ],
          [
            {
              src: "/static/stave/note0.25.png",
              width: 9,
              height: 19,
              alt: "quarter"
            },
            "quarter"
          ],
          [
            {
              src: "/static/stave/note0.125.png",
              width: 9,
              height: 19,
              alt: "eighth"
            },
            "eighth"
          ]
        ]
      },
      {
        type: "input_value",
        name: "NOTE_PITCH",
        check: "String"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_note"] = function(block) {
  const [noteLen, notePitch] = ["NOTE_LEN", "NOTE_PITCH"].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  console.log([noteLen, notePitch]);

  return ``;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_rest",
    message0: "产生 %1",
    args0: [
      {
        type: "field_dropdown",
        name: "REST_LEN",
        options: [
          [
            {
              src: "/static/stave/rest0.5.png",
              width: 9,
              height: 19,
              alt: "half"
            },
            "half"
          ],
          [
            {
              src: "/static/stave/rest0.25.png",
              width: 9,
              height: 19,
              alt: "quarter"
            },
            "quarter"
          ],
          [
            {
              src: "/static/stave/rest0.125.png",
              width: 9,
              height: 19,
              alt: "eighth"
            },
            "eighth"
          ]
        ]
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_rest"] = function(block) {
  const [restLen] = ["REST_LEN"].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  console.log(restLen);

  return ``;
};
