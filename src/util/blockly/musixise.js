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
    type: "create_track",
    message0: "乐轨 音色 %1 速度 %2 音量 %3 节拍 %4 效果 %5",
    args0: [
      {
        type: "input_value",
        name: "TIMBRE",
        check: "String"
      },
      {
        type: "input_value",
        name: "TEMPO",
        check: "Number"
      },
      {
        type: "input_value",
        name: "VOLUMN",
        check: "Number"
      },
      {
        type: "input_value",
        name: "METRE",
        check: "String"
      },
      {
        type: "input_value",
        name: "FX"
      }
      // {
      //   type: "field_dropdown",
      //   name: "MUTE",
      //   options: [["N", 0], ["Y", 1]]
      // }
    ],
    message1: "小节 %1",
    args1: [{ type: "input_statement", name: "measures" }],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 155,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_track"] = function(block) {
  // Do while/until loop.
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
    Blockly.JavaScript.ORDER_NONE
  );
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "TEMPO",
    Blockly.JavaScript.ORDER_NONE
  );
  const volumn = Blockly.JavaScript.valueToCode(
    block,
    "VOLUMN",
    Blockly.JavaScript.ORDER_NONE
  );
  const metre = Blockly.JavaScript.valueToCode(
    block,
    "METRE",
    Blockly.JavaScript.ORDER_NONE
  ); // measure length = metre * 240/tempo
  // const mute = this.getFieldValue("MUTE");
  // alert(typeof mute);
  var branch = Blockly.JavaScript.statementToCode(block, "measures");
  // branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  // console.log("=====", timbre);
  // console.log("=====", measure);
  // console.log("=====", volumn);
  // console.log("=====", metre);
  // console.log("=====", branch);
  return `
  createTrack(${timbre},${measure},${volumn},${metre});
  ${branch}
  `;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_new",
    message0: "音符对位 小节 %1 音序 %2 拍子%3 声部 %4",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "PART",
        check: "Number"
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

Blockly.JavaScript["create_measure_new"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const sequence = Blockly.JavaScript.valueToCode(
    block,
    "SEQUENCE",
    Blockly.JavaScript.ORDER_NONE
  );
  const beat = Blockly.JavaScript.valueToCode(
    block,
    "BEAT",
    Blockly.JavaScript.ORDER_NONE
  );
  const part = Blockly.JavaScript.valueToCode(
    block,
    "PART",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasureNew(${measure},${sequence},${beat},false,'${
    block.id
  },${part}');\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale_new",
    message0: "音级对位 小节%1 音序 %2 拍子%3 调式%4 根音%5 声部%6",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "SCALE",
        check: "String"
      },
      {
        type: "input_value",
        name: "BASENOTE",
        check: "String"
      },
      {
        type: "input_value",
        name: "PART",
        check: "Number"
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

Blockly.JavaScript["create_measure_on_scale_new"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const sequence = Blockly.JavaScript.valueToCode(
    block,
    "SEQUENCE",
    Blockly.JavaScript.ORDER_NONE
  );
  const beat = Blockly.JavaScript.valueToCode(
    block,
    "BEAT",
    Blockly.JavaScript.ORDER_NONE
  );
  const scale = Blockly.JavaScript.valueToCode(
    block,
    "SCALE",
    Blockly.JavaScript.ORDER_NONE
  );
  const basenote = Blockly.JavaScript.valueToCode(
    block,
    "BASENOTE",
    Blockly.JavaScript.ORDER_NONE
  );
  const part = Blockly.JavaScript.valueToCode(
    block,
    "PART",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasureOnScaleNew(${measure},${sequence},${beat},${scale},${basenote},false,'${
    block.id
  }',${part});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_match_zero_new",
    message0: "音符对0 小节 %1 音序 %2 拍子%3 声部%4",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "PART",
        check: "Number"
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

Blockly.JavaScript["create_measure_match_zero_new"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const sequence = Blockly.JavaScript.valueToCode(
    block,
    "SEQUENCE",
    Blockly.JavaScript.ORDER_NONE
  );
  const beat = Blockly.JavaScript.valueToCode(
    block,
    "BEAT",
    Blockly.JavaScript.ORDER_NONE
  );
  const part = Blockly.JavaScript.valueToCode(
    block,
    "PART",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasureNew(${measure},${sequence},${beat},true,'${
    block.id
  }',${part});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale_match_zero_new",
    message0: "音级对0 小节 %1 音序 %2 拍子%3 调式%4 根音%5 声部%6",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "SCALE",
        check: "String"
      },
      {
        type: "input_value",
        name: "BASENOTE",
        check: "String"
      },
      {
        type: "input_value",
        name: "PART",
        check: "Number"
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

Blockly.JavaScript["create_measure_on_scale_match_zero_new"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const sequence = Blockly.JavaScript.valueToCode(
    block,
    "SEQUENCE",
    Blockly.JavaScript.ORDER_NONE
  );
  const beat = Blockly.JavaScript.valueToCode(
    block,
    "BEAT",
    Blockly.JavaScript.ORDER_NONE
  );
  const scale = Blockly.JavaScript.valueToCode(
    block,
    "SCALE",
    Blockly.JavaScript.ORDER_NONE
  );
  const basenote = Blockly.JavaScript.valueToCode(
    block,
    "BASENOTE",
    Blockly.JavaScript.ORDER_NONE
  );
  const part = Blockly.JavaScript.valueToCode(
    block,
    "PART",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasureOnScaleNew(${measure},${sequence},${beat},${scale},${basenote},true,'${
    block.id
  }',${part});\n`;
};
