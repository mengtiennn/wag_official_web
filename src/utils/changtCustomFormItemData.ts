// import { inputList } from '@/components/commonProblemList/dialogVmodel'

// export function processApiData(data: any, keysToDisplay: any[]): inputList[] {
//   function processValue(config: any, value: any): inputList {
//     const item: inputList = { label: config.label, type: config.type };

//     if (typeof value === 'object' && value !== null) {
//       if (Array.isArray(value)) {
//         item.childrenList = value.flatMap((childValue, index) => {
//           if (typeof childValue === 'object' && childValue !== null) {
//             return Object.entries(childValue).map(([key, val], childIndex) => ({
//               label: key,
//               type: config.children ? config.children[childIndex] || 'text' : 'text',
//               value: val
//             }));
//           }
//           return {
//             label: `${config.label}[${index}]`,
//             type: config.children ? config.children[index] || 'text' : 'text',
//             value: childValue
//           };
//         });
//       } else if ('value' in value) {
//         item.value = value.value;
//       } else {
//         item.childrenList = Object.entries(value).map(([key, val]) => ({
//           label: key,
//           type: 'text',
//           value: val as string
//         }));
//       }
//     } else {
//       item.value = value;
//     }

//     return item;
//   }

//   return keysToDisplay.map(config => {
//     if (config.label in data) {
//       return processValue(config, data[config.label]);
//     }
//     return null;
//   }).filter((item): item is inputList => item !== null);
// }