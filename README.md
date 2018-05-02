# Musixise thru Code

**Explore/Compose/Know music thru code/Blockly. It will be fun!**

The project is based on Google's Blockly, which enables users to drag and drop to generate codes, thus generating music here.
The core idea is to make music by units of measures

**create_measure**
(measure,timbre,sequence,beat)

`1,'pulse','D4,E4,G4,A4','00-0'` ==> D4 E4- A4

**create_measure_on_scale**
(measure,timbre,sequence,beat,scale,basenote)

`1,'pulse',"1,2,3,4'",'00-0','Ionian','C4'` ==> C4,D4-,F5

**create_measure_match_zero**
(measure,timbre,sequence,beat)

`1,'pulse','D4,E4,G4,A4','00-00-'` ==> D4 E4- G4 A4-

**create_measure_on_scale_match_zero**
(measure,timbre,sequence,beat,scale,basenote)

`1,'pulse',"1,2,3,4'",'00-0','Ionian','C4'` ==> C4,D4-,E4
