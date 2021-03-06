var test_stimuli = [
    { stimulus: { cue: '火车', targetA: '坦克', targetB: '炸弹' } },
    { stimulus: { cue: '云', targetA: '玫瑰', targetB: '羽毛' } },
    { stimulus: { cue: '教师', targetA: '护士', targetB: '尺' } },
    { stimulus: { cue: '医生', targetA: '飞行员', targetB: '教师' } },
    { stimulus: { cue: '蜡烛', targetA: '手指', targetB: '钥匙' } },
    { stimulus: { cue: '蜡烛', targetA: '针', targetB: '电脑' } },
    { stimulus: { cue: '蜡烛', targetA: '铅笔', targetB: '梳子' } },
    { stimulus: { cue: '蜡烛', targetA: '柱子', targetB: '矛' } },
    { stimulus: { cue: '蜡烛', targetA: '香蕉', targetB: '钥匙' } },
    { stimulus: { cue: '蜡烛', targetA: '粉笔', targetB: '剪刀' } },
    { stimulus: { cue: '手指', targetA: '针', targetB: '梳子' } },
    { stimulus: { cue: '手指', targetA: '柱子', targetB: '小刀' } },
    { stimulus: { cue: '手指', targetA: '香蕉', targetB: '矛' } },
    { stimulus: { cue: '手指', targetA: '粉笔', targetB: '链子' } },
    { stimulus: { cue: '针', targetA: '铅笔', targetB: '温度计' } },
    { stimulus: { cue: '针', targetA: '柱子', targetB: '手臂' } },
    { stimulus: { cue: '针', targetA: '香蕉', targetB: '锤子' } },
    { stimulus: { cue: '针', targetA: '粉笔', targetB: '梳子' } },
    { stimulus: { cue: '铅笔', targetA: '柱子', targetB: '墙' } },
    { stimulus: { cue: '铅笔', targetA: '香蕉', targetB: '尺' } },
    { stimulus: { cue: '柱子', targetA: '香蕉', targetB: '纽扣' } },
    { stimulus: { cue: '柱子', targetA: '粉笔', targetB: '收音机' } },
    { stimulus: { cue: '香蕉', targetA: '粉笔', targetB: '炸弹' } },
    { stimulus: { cue: '钢琴', targetA: '直升机', targetB: '短裙' } },
    { stimulus: { cue: '剪刀', targetA: '小刀', targetB: '枪' } },
    { stimulus: { cue: '剪刀', targetA: '叉子', targetB: '矛' } },
    { stimulus: { cue: '剪刀', targetA: '钥匙', targetB: '子弹' } },
    { stimulus: { cue: '剪刀', targetA: '扫帚', targetB: '纽扣' } },
    { stimulus: { cue: '剪刀', targetA: '锤子', targetB: '柱子' } },
    { stimulus: { cue: '剪刀', targetA: '勺子', targetB: '门' } },
    { stimulus: { cue: '剪刀', targetA: '尺', targetB: '铅笔' } },
    { stimulus: { cue: '剪刀', targetA: '吉他', targetB: '弓' } },
    { stimulus: { cue: '剪刀', targetA: '螺丝刀', targetB: '枪' } },
    { stimulus: { cue: '小刀', targetA: '钥匙', targetB: '铅笔' } },
    { stimulus: { cue: '小刀', targetA: '扫帚', targetB: '蜡烛' } },
    { stimulus: { cue: '小刀', targetA: '锤子', targetB: '药丸' } },
    { stimulus: { cue: '小刀', targetA: '梳子', targetB: '针' } },
    { stimulus: { cue: '小刀', targetA: '勺子', targetB: '链子' } },
    { stimulus: { cue: '小刀', targetA: '伞', targetB: '药丸' } },
    { stimulus: { cue: '小刀', targetA: '尺', targetB: '纽扣' } },
    { stimulus: { cue: '小刀', targetA: '螺丝刀', targetB: '矛' } },
    { stimulus: { cue: '叉子', targetA: '钥匙', targetB: '收音机' } },
    { stimulus: { cue: '叉子', targetA: '伞', targetB: '药丸' } },
    { stimulus: { cue: '叉子', targetA: '椅子', targetB: '针' } },
    { stimulus: { cue: '叉子', targetA: '尺', targetB: '相机' } },
    { stimulus: { cue: '钥匙', targetA: '锤子', targetB: '蜡烛' } },
    { stimulus: { cue: '钥匙', targetA: '伞', targetB: '汽车' } },
    { stimulus: { cue: '钥匙', targetA: '勺子', targetB: '针' } },
    { stimulus: { cue: '钥匙', targetA: '尺', targetB: '香烟' } },
    { stimulus: { cue: '钥匙', targetA: '剑', targetB: '手臂' } },
    { stimulus: { cue: '扫帚', targetA: '锤子', targetB: '铅笔' } },
    { stimulus: { cue: '扫帚', targetA: '椅子', targetB: '纽扣' } },
    { stimulus: { cue: '扫帚', targetA: '小提琴', targetB: '珍珠' } },
    { stimulus: { cue: '扫帚', targetA: '螺丝刀', targetB: '铅笔' } },
    { stimulus: { cue: '锤子', targetA: '伞', targetB: '柱子' } },
    { stimulus: { cue: '锤子', targetA: '小提琴', targetB: '收音机' } },
    { stimulus: { cue: '锤子', targetA: '尺', targetB: '柱子' } },
    { stimulus: { cue: '锤子', targetA: '吉他', targetB: '纽扣' } },
    { stimulus: { cue: '梳子', targetA: '伞', targetB: '药丸' } },
    { stimulus: { cue: '勺子', targetA: '椅子', targetB: '铅笔' } },
    { stimulus: { cue: '伞', targetA: '椅子', targetB: '相机' } },
    { stimulus: { cue: '伞', targetA: '小提琴', targetB: '五角星' } },
    { stimulus: { cue: '伞', targetA: '剑', targetB: '邮票' } },
    { stimulus: { cue: '伞', targetA: '吉他', targetB: '肥皂' } },
    { stimulus: { cue: '伞', targetA: '螺丝刀', targetB: '五角星' } },
    { stimulus: { cue: '椅子', targetA: '小提琴', targetB: '钢琴' } },
    { stimulus: { cue: '椅子', targetA: '剑', targetB: '小刀' } },
    { stimulus: { cue: '椅子', targetA: '吉他', targetB: '枪' } },
    { stimulus: { cue: '珍珠', targetA: '子弹', targetB: '奖章' } },
    { stimulus: { cue: '珍珠', targetA: '炸弹', targetB: '铅笔' } },
    { stimulus: { cue: '纽扣', targetA: '子弹', targetB: '小刀' } },
    { stimulus: { cue: '纽扣', targetA: '炸弹', targetB: '梳子' } },
    { stimulus: { cue: '纽扣', targetA: '玉米', targetB: '蜡烛' } },
    { stimulus: { cue: '纽扣', targetA: '药丸', targetB: '尺' } },
    { stimulus: { cue: '牙齿', targetA: '炸弹', targetB: '收音机' } },
    { stimulus: { cue: '牙齿', targetA: '五角星', targetB: '吉他' } },
    { stimulus: { cue: '牙齿', targetA: '玉米', targetB: '尺' } },
    { stimulus: { cue: '牙齿', targetA: '药丸', targetB: '相机' } },
    { stimulus: { cue: '子弹', targetA: '五角星', targetB: '梳子' } },
    { stimulus: { cue: '子弹', targetA: '玉米', targetB: '拖拉机' } },
    { stimulus: { cue: '炸弹', targetA: '五角星', targetB: '相机' } },
    { stimulus: { cue: '炸弹', targetA: '玉米', targetB: '链子' } },
    { stimulus: { cue: '炸弹', targetA: '药丸', targetB: '吉他' } },
    { stimulus: { cue: '五角星', targetA: '玉米', targetB: '短裙' } },
    { stimulus: { cue: '五角星', targetA: '药丸', targetB: '钥匙' } },
    { stimulus: { cue: '玉米', targetA: '药丸', targetB: '小刀' } },
    { stimulus: { cue: '狮子', targetA: '大象', targetB: '蛇' } },
    { stimulus: { cue: '绳子', targetA: '裤子', targetB: '蜡烛' } },
    { stimulus: { cue: '绳子', targetA: '短裙', targetB: '尺' } },
    { stimulus: { cue: '蛇', targetA: '路', targetB: '手臂' } },
    { stimulus: { cue: '蛇', targetA: '短裙', targetB: '珍珠' } },
    { stimulus: { cue: '路', targetA: '短裙', targetB: '小刀' } },
    { stimulus: { cue: '路', targetA: '围巾', targetB: '吉他' } },
    { stimulus: { cue: '路', targetA: '皮带', targetB: '五角星' } },
    { stimulus: { cue: '裤子', targetA: '电线', targetB: '柱子' } },
    { stimulus: { cue: '裤子', targetA: '链子', targetB: '铅笔' } },
    { stimulus: { cue: '短裙', targetA: '电线', targetB: '珍珠' } },
    { stimulus: { cue: '围巾', targetA: '电线', targetB: '子弹' } },
    { stimulus: { cue: '皮带', targetA: '链子', targetB: '椅子' } },
    { stimulus: { cue: '沙发', targetA: '弓', targetB: '蜡烛' } },
    { stimulus: { cue: '桌子', targetA: '弓', targetB: '相机' } },
    { stimulus: { cue: '床', targetA: '嘴', targetB: '珍珠' } },
    { stimulus: { cue: '床', targetA: '弓', targetB: '收音机' } },
    { stimulus: { cue: '嘴', targetA: '弓', targetB: '炸弹' } },
    { stimulus: { cue: '肥皂', targetA: '肉', targetB: '相机' } },
    { stimulus: { cue: '温度计', targetA: '枪', targetB: '小刀' } },
    { stimulus: { cue: '温度计', targetA: '手臂', targetB: '椅子' } },
    { stimulus: { cue: '温度计', targetA: '羽毛', targetB: '蜡烛' } },
    { stimulus: { cue: '枪', targetA: '羽毛', targetB: '药丸' } },
    { stimulus: { cue: '矛', targetA: '手臂', targetB: '尺' } },
    { stimulus: { cue: '矛', targetA: '羽毛', targetB: '柱子' } },
    { stimulus: { cue: '矛', targetA: '手', targetB: '子弹' } },
    { stimulus: { cue: '手臂', targetA: '羽毛', targetB: '短裙' } },
    { stimulus: { cue: '羽毛', targetA: '手', targetB: '纽扣' } },
    { stimulus: { cue: '旗帜', targetA: '镜子', targetB: '吉他' } },
    { stimulus: { cue: '旗帜', targetA: '鼓', targetB: '士兵' } }
];

var instructionsWordsZH = ['<h3>词语配对实验</h3>' +
    '<p>这个实验有关词语之间的相关性。</p>' +
    '<p>在本实验中，你会先看到一个“十”字。它会在每组词语出现前都出现一次。当十字消失之后，你会看到三个词语。 ' +
    '<p>例如：</p><p><img src="../img/exampleMandarinWords.png" width="220px"></p>' +
    '<br>你的任务是以位于下方的词为依据，选择上方两个词中与它相关度最高的一个，如果你觉得位于左侧的词与下方的词更有关联，请按 “<strong>f</strong>” 键； ' +
    '<br>如果你觉得位于右侧的词与下方的词更有关联，请按 “<strong>j</strong>” 键。</p>' +
    '<p>部分词语会重复出现。有一些词语组合难度较大，可能会难以分辨，请根据你的直觉<strong>尽快作出选择</strong>。</p>' +
    '<p>实验包含116组词语且没有预先练习。实验时长10分钟左右。参加者遵循自愿的原则，可以随时退出实验。</p>'
];

var instructionsNext = '下一页';
var instructionsPrevious = '前一页';


var imageList = [];