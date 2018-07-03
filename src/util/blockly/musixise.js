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

/***************** new methods (simpler)*********************/
Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_track",
    message0: "乐轨 音色 %1 速度 %2 音量 %3",
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
        check: "Number" //should be array
      }
    ],
    message1: "小节 %1",
    args1: [{ type: "input_statement", name: "measures" }],
    inputsInline: true,
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
  var branch = Blockly.JavaScript.statementToCode(block, "measures");
  // branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  console.log("=====", timbre);
  console.log("=====", measure);
  console.log("=====", volumn);
  console.log("=====", branch);
  return `
  createTrack(${timbre},${measure},${volumn});
  ${branch}
  `;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_new",
    message0: "音符对位 小节 %1 音序 %2 节拍%3",
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
  return `createMeasureNew(${measure},${sequence},${beat});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale_new",
    message0: "简谱对位 小节%1 音序 %2 节拍%3 调式%4 根音%5",
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
  return `createMeasureOnScaleNew(${measure},${sequence},${beat},${scale},${basenote});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_match_zero_new",
    message0: "音符对0 小节 %1 音序 %2 节拍%3",
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
  return `createMeasureNew(${measure},${sequence},${beat},true);\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale_match_zero_new",
    message0: "简谱对0 小节 %1 音序 %2 节拍%3 调式%4 根音%5",
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
  return `createMeasureOnScaleNew(${measure},${sequence},${beat},${scale},${basenote},true);\n`;
};

/*********** old methods (redundant)**************/
Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure",
    message0: "音符对位 小节 %1 音色 %2 音序 %3 节拍%4 力度%5",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        // "type": "field_dropdown",
        // "name": "TIMBRE",
        // "options": [
        //   ["SINE", "sine_synth"],
        //   ["TRIANGLE", "triangle_synth"],
        //   ["SQUARE", "square_synth"]
        // ]
        type: "input_value",
        name: "TIMBRE",
        check: "String"
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
        name: "VELOCITY",
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

Blockly.JavaScript["create_measure"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
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
  const velocity = Blockly.JavaScript.valueToCode(
    block,
    "VELOCITY",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasure(${measure},${timbre},${sequence},${beat},${velocity});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale",
    message0: "简谱对位 %1 音色 %2 音序 %3 节拍%4 调式%5 根音%6 力度%7",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        // "type": "field_dropdown",
        // "name": "TIMBRE",
        // "options": [
        //   ["SINE", "sine_synth"],
        //   ["TRIANGLE", "triangle_synth"],
        //   ["SQUARE", "square_synth"]
        // ]
        type: "input_value",
        name: "TIMBRE",
        check: "String"
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
        name: "VELOCITY",
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

Blockly.JavaScript["create_measure_on_scale"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
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
  const velocity = Blockly.JavaScript.valueToCode(
    block,
    "VELOCITY",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasureOnScale(${measure},${timbre},${sequence},${beat},${scale},${basenote},${velocity});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_match_zero",
    message0: "音符不对位 小节 %1 音色 %2 音序 %3 节拍%4 力度%5",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        // "type": "field_dropdown",
        // "name": "TIMBRE",
        // "options": [
        //   ["SINE", "sine_synth"],
        //   ["TRIANGLE", "triangle_synth"],
        //   ["SQUARE", "square_synth"]
        // ]
        type: "input_value",
        name: "TIMBRE",
        check: "String"
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
        name: "VELOCITY",
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

Blockly.JavaScript["create_measure_match_zero"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
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
  const velocity = Blockly.JavaScript.valueToCode(
    block,
    "VELOCITY",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasure(${measure},${timbre},${sequence},${beat},${velocity},true);\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale_match_zero",
    message0: "简谱不对位 小节 %1 音色 %2 音序 %3 节拍%4 调式%5 根音%6 力度%7",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        // "type": "field_dropdown",
        // "name": "TIMBRE",
        // "options": [
        //   ["SINE", "sine_synth"],
        //   ["TRIANGLE", "triangle_synth"],
        //   ["SQUARE", "square_synth"]
        // ]
        type: "input_value",
        name: "TIMBRE",
        check: "String"
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
        name: "VELOCITY",
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

Blockly.JavaScript["create_measure_on_scale_match_zero"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
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
  const velocity = Blockly.JavaScript.valueToCode(
    block,
    "VELOCITY",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasureOnScale(${measure},${timbre},${sequence},${beat},${scale},${basenote},${velocity},true);\n`;
};
