const sexSelection = [
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

const edubgSelection = [
  {
    label: "博士",
    value: "博士",
  },
  {
    label: "硕士",
    value: "硕士",
  },
  {
    label: "本科",
    value: "本科",
  },
  {
    label: "其他",
    value: "其他",
  },
];

const schoolSelection = [
  {
    label: "985",
    value: "985",
  },
  {
    label: "211",
    value: "211",
  },
  {
    label: "双一流",
    value: "双一流",
  },
  {
    label: "QS前50",
    value: "QS前50",
  },
  {
    label: "QS前100",
    value: "QS前100",
  },
  {
    label: "其他",
    value: "其他",
  },
];

const starSelection = [
  {
    label: "5星",
    value: "5",
  },
  {
    label: "4星",
    value: "4",
  },
  {
    label: "3星",
    value: "3",
  },
  {
    label: "2星",
    value: "2",
  },
  {
    label: "1星",
    value: "1",
  },
];

const subjectSelection = [
  {
    label: "语文",
    value: "语文",
  },
  {
    label: "数学",
    value: "数学",
  },
  {
    label: "英语",
    value: "英语",
  },
  {
    label: "政治",
    value: "政治",
  },
  {
    label: "历史",
    value: "历史",
  },
  {
    label: "地理",
    value: "地理",
  },
  {
    label: "物理",
    value: "物理",
  },
  {
    label: "化学",
    value: "化学",
  },
  {
    label: "生物",
    value: "生物",
  },
  {
    label: "计算机",
    value: "计算机",
  },
  {
    label: "美术",
    value: "美术",
  },
  {
    label: "音乐",
    value: "音乐",
  },
];

const tecAgeSelection = [
  {
    label: "3-5年",
    value: "3-5年",
  },
  {
    label: "5-7年",
    value: "5-7年",
  },
  {
    label: "7-9年",
    value: "7-9年",
  },
  {
    label: "10年及以上",
    value: "10年及以上",
  },
];

const tableData = [
  {
    name: "张三",
    age: 18,
    sex: "男",
    school: "北京大学",
    edubg: "本科",
    star: 5,
    subject: "数学",
    tecAge: "3-5年",
    rank: "985",
  },
  {
    name: "李四",
    age: 20,
    sex: "女",
    school: "清华大学",
    edubg: "硕士",
    star: 4,
    subject: "英语",
    tecAge: "5-7年",
    rank: "QS前50",
  },
];

const homeData = {
  sexSelection,
  edubgSelection,
  schoolSelection,
  starSelection,
  subjectSelection,
  tecAgeSelection,
  tableData,
};

export default homeData;
