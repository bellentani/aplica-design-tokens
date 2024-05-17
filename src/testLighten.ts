import ColorJS from 'colorjs.io';

// const colorFirst = new ColorJS('#FE1B6A')

// colorFirst.lighten(0.1) // #FF3D8C

const colorParsed: {[index: number]: any} = {}; // Initialize the constant with an empty object
let counter = 100;
let color = new ColorJS("#FE1B6A");
color.steps("white", {
	space: "lch",
	outputSpace: "srgb",
	// maxDeltaE: 3, // max deltaE between consecutive steps (optional)
	steps: 101 // min number of steps
}).map(c => {
  if (counter % 10 === 0 && counter > 0) {
    colorParsed[counter] = c.toString({ format: "hex" });
    console.log(c.toString({ format: "hex" }), "inseriu")
  } else {
    console.log(c.toString({ format: "hex" }))
  }
  --counter;
});
console.log(colorParsed)

// const colorParsed2: {[index: number]: any} = {}; // Initialize the constant with an empty object
// let counter2 = 100;
// let color2 = new ColorJS("#FE1B6A");
// color2.steps("black", {
// 	space: "lch",
// 	outputSpace: "srgb",
// 	maxDeltaE: 9, // max deltaE between consecutive steps (optional)
// 	steps: 11 // min number of steps
// }).map(c => {
//   if (counter2 > 0) {
    
//   }
//   colorParsed2[counter2] = c.toString({ format: "hex" });
//   counter2 += 10;
//   console.log(c.toString({ format: "hex" }))
// });
// console.log(colorParsed2)

// console.log(color.steps().map(c => c.toString({ format: "hex" })
// console.dir(color.toString({ format: "hex" }), { depth: null })

// {
//   '4': '#f6f4f4',
//   '8': '#ece9ea',
//   '15': '#dcd6d8',
//   '23': '#cac1c3',
//   '31': '#b8acaf',
//   '38': '#a99a9e',
//   '46': '#97868b',
//   '54': '#867378',
//   '62': '#756066',
//   '69': '#675056',
//   '77': '#573e45',
//   '85': '#472d35',
//   '92': '#391e27'
// }

// {
//     '0': '#fff',
//    '10': '#ffedef',
//    '20': '#ffdbdf',
//    '30': '#ffc8cf',
//    '40': '#ffb6c0',
//    '50': '#ffa2b1',
//    '60': '#ff8fa2',
//    '70': '#ff7994',
//    '80': '#ff6285',
//    '90': '#ff4777',
//   '100': '#fe1b6a'
// }
//   '10': '#ffeff0',
//   '20': '#ffdce0',
//   '30': '#ffcad1',
//   '40': '#ffb7c1',
//   '50': '#ffa3b2',
//   '60': '#ff8fa3',
//   '70': '#ff7a94',
//   '80': '#ff6386',
//   '90': '#ff4778',
//  '100': '#fe1b6a'
// {
//   '0': '#ffeff0',
//   '10': '#ffdee2',
//   '20': '#ffcdd4',
//   '30': '#ffbcc6',
//   '40': '#ffabb8',
//   '50': '#ff9aaa',
//   '60': '#ff879d',
//   '70': '#ff7390',
//   '80': '#ff5e83',
//   '90': '#ff4476',
//   '100': '#fe1b6a',
//   '-10': '#fff'
// }
// {
//   '100': '#fe1b6a',
//   '110': '#e41f60',
//   '120': '#cb2156',
//   '130': '#b3224d',
//   '140': '#9b2143',
//   '150': '#84203a',
//   '160': '#6d1e31',
//   '170': '#581b28',
//   '180': '#431720',
//   '190': '#2e1318',
//   '200': '#1c0c0e',
//   '210': '#000'
// }

// {
//     '0': '#ffeff0',
//    '10': '#ffdee2',
//    '20': '#ffcdd4',
//    '30': '#ffbcc6',
//    '40': '#ffabb8',
//    '50': '#ff9aaa',
//    '60': '#ff879d',
//    '70': '#ff7390',
//    '80': '#ff5e83',
//    '90': '#ff4476',
//   '100': '#fe1b6a',
//   '110': '#e41f60',
//   '120': '#cb2156',
//   '130': '#b3224d',
//   '140': '#9b2143',
//   '150': '#84203a',
//   '160': '#6d1e31',
//   '170': '#581b28',
//   '180': '#431720',
//   '190': '#2e1318',
// }



//  '0': '#ffeff0',
// '10': '#ffdee2',
// '20': '#ffcdd4',
// '30': '#ffbcc6',
// '40': '#ffabb8',
// '50': '#ff9aaa',
// '60': '#ff879d',
// '70': '#ff7390',
// '80': '#ff5e83',
// '90': '#ff4476',
//'100': '#fe1b6a',

// #fe1b6a// #fe1b6a
// #ff4a79// #ff4476
// #ff6888// #ff5e83
// #ff8198// #ff7390
// #ff97a9// #ff879d
// #ffadb9// #ff9aaa
// #ffc2ca// #ffabb8
// #ffd7dc// #ffbcc6
// #ffebed// #ffcdd4
// #fff   // #ffdee2
          // #ffeff0
          // #fff

// #fe1b6a
// #ff4a79
// #ff6888
// #ff8198
// #ff97a9
// #ffadb9
// #ffc2ca
// #ffd7dc
// #ffebed
// #fff

// #fe1b6a
// #ff2d6e
// #ff3a72
// #ff4577
// #ff4e7b
// #ff577f
// #ff5f84
// #ff6788
// #ff6e8c
// #ff7591
// #ff7c95
// #ff839a
// #ff899e
// #ff90a3
// #ff96a8
// #ff9cac
// #ffa2b1
// #ffa9b6
// #ffafba
// #ffb4bf
// #ffbac4
// #ffc0c9
// #ffc6cd
// #ffccd2
// #ffd2d7
// #ffd7dc
// #ffdde1
// #ffe3e6
// #ffe8eb
// #ffeef0
// #fff4f5
// #fff9fa
// #fff