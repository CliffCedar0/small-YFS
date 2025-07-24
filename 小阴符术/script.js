const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 时辰名称映射
const shiChenNames = {
    "子": "子时 (23:00-00:59)",
    "丑": "丑时 (01:00-02:59)",
    "寅": "寅时 (03:00-04:59)",
    "卯": "卯时 (05:00-06:59)",
    "辰": "辰时 (07:00-08:59)",
    "巳": "巳时 (09:00-10:59)",
    "午": "午时 (11:00-12:59)",
    "未": "未时 (13:00-14:59)",
    "申": "申时 (15:00-16:59)",
    "酉": "酉时 (17:00-18:59)",
    "戌": "戌时 (19:00-20:59)",
    "亥": "亥时 (21:00-22:59)"
};

// 六合关系映射
const liuheMap = {
    "子": "丑",
    "丑": "子",
    "寅": "亥",
    "亥": "寅",
    "卯": "戌",
    "戌": "卯",
    "辰": "酉",
    "酉": "辰",
    "巳": "申",
    "申": "巳",
    "午": "未",
    "未": "午"
};

// 地支分段数量定义
const dizhiParts = {
    "子": 2,
    "丑": 2,
    "寅": 5,
    "卯": 4,
    "辰": 7,
    "巳": 1,
    "午": 3,
    "未": 3,
    "申": 1,
    "酉": 2,
    "戌": 2,
    "亥": 2
};

// 星司名称映射
const xingsiNames = {
    "子-1": "天渊",
    "子-2": "天桴",
    "丑-1": "天厨",
    "丑-2": "天垒",
    "寅-1": "天厩",
    "寅-2": "天罇",
    "寅-3": "天鸡",
    "寅-4": "天园",
    "寅-5": "天溷",
    "卯-1": "天庾",
    "卯-2": "天仓",
    "卯-3": "天囷",
    "卯-4": "天廪",
    "辰-1": "天谗",
    "辰-2": "天苑",
    "辰-3": "天阴",
    "辰-4": "天街",
    "辰-5": "天潢",
    "辰-6": "天高",
    "辰-7": "天船",
    "巳-1": "天关",
    "午-1": "天社",
    "午-2": "天纪",
    "午-3": "天狼",
    "未-1": "天庙",
    "未-2": "天稷",
    "未-3": "天相",
    "申-1": "天枪",
    "酉-1": "天门",
    "酉-2": "天田",
    "戌-1": "天江",
    "戌-2": "天辐",
    "亥-1": "天籥",
    "亥-2": "天井"
};

// 星司对应的数字映射
const xingsiNumberMap = {
    "天厨": 1,
    "天垒": 2,
    "天渊": 3,
    "天桴": 4,
    "天籥": 5,
    "天井": 6,
    "天江": 7,
    "天辐": 8,
    "天门": 9,
    "天田": 10,
    "天枪": 11,
    "天庙": 12,
    "天稷": 13,
    "天相": 14,
    "天社": 15,
    "天纪": 16,
    "天狼": 17,
    "天关": 18,
    "天谗": 19,
    "天苑": 20,
    "天阴": 21,
    "天街": 22,
    "天潢": 23,
    "天高": 24,
    "天船": 25,
    "天庾": 26,
    "天仓": 27,
    "天囷": 28,
    "天廪": 29,
    "天厩": 30,
    "天罇": 31,
    "天鸡": 32,
    "天园": 33,
    "天溷": 34
};

// 根据星司名称获取对应的数字
function getXingsiNumber(xingsiName) {
    return xingsiNumberMap[xingsiName] || 0;
}

// 填充下拉框
function fillSelect(id) {
    const sel = document.getElementById(id);
    sel.innerHTML = '';
    
    // 如果是天盘下拉框，添加"无"选项
    if (id === 'tianpan') {
        const optNone = document.createElement('option');
        optNone.value = "无";
        optNone.textContent = "无";
        sel.appendChild(optNone);
    }
    
    // 添加地支选项
    dizhi.forEach(dz => {
        const opt = document.createElement('option');
        opt.value = dz;
        opt.textContent = dz;
        sel.appendChild(opt);
    });
}

// 获取当前时辰对应的地支
function getCurrentTimeBranch() {
    const now = new Date();
    const hour = now.getHours();
    
    // 根据时间确定时辰和地支
    if (hour >= 23 || hour < 1) return "子";
    if (hour >= 1 && hour < 3) return "丑";
    if (hour >= 3 && hour < 5) return "寅";
    if (hour >= 5 && hour < 7) return "卯";
    if (hour >= 7 && hour < 9) return "辰";
    if (hour >= 9 && hour < 11) return "巳";
    if (hour >= 11 && hour < 13) return "午";
    if (hour >= 13 && hour < 15) return "未";
    if (hour >= 15 && hour < 17) return "申";
    if (hour >= 17 && hour < 19) return "酉";
    if (hour >= 19 && hour < 21) return "戌";
    if (hour >= 21 && hour < 23) return "亥";
    
    return "子"; // 默认值
}

// 获取当前刻
function getCurrentKe() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // 每10分钟一个刻，根据小时和分钟确定对应的刻
    // 示例：14:24对应的是申刻 (14:20-14:29)
    
    // 确定分钟对应的刻序号 (0-5)
    const keIdx = Math.floor(minute / 10);
    
    // 对应的刻名称（不论在哪个时辰，每小时内的刻都是按照子丑寅卯辰巳-午未申酉戌亥的顺序排列）
    const keNames = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    
    // 确定当前刻在数组中的索引
    // 每小时的前一部分对应子丑寅卯辰巳，后一部分对应午未申酉戌亥
    const isSecondHalf = (hour % 2) === 0; // 偶数小时是第二个小时
    const baseIndex = isSecondHalf ? 6 : 0; // 基础索引
    
    return keNames[baseIndex + keIdx];
}

// 获取当前刻的时间范围字符串
function getKeTimeRange() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // 计算当前刻的起始分钟和结束分钟
    const startMinute = Math.floor(minute / 10) * 10;
    const endMinute = startMinute + 9;
    
    // 格式化时间
    const formatTime = (h, m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    
    return `${formatTime(hour, startMinute)} - ${formatTime(hour, endMinute)}`;
}

// 更新刻信息显示
function updateKeInfo() {
    console.log("开始更新刻辰信息");
    
    try {
        const now = new Date();
        const currentKe = getCurrentKe();
        const keTimeRange = getKeTimeRange();
        
        // 获取刻信息显示元素
        const keTimeRangeElement = document.getElementById('ke-time-range');
        
        if (keTimeRangeElement) {
            keTimeRangeElement.innerHTML = `当前刻: <strong>${currentKe}</strong> (${keTimeRange})`;
            console.log(`已更新刻辰信息: ${currentKe}刻 (${keTimeRange})`);
        } else {
            console.error("未找到ke-time-range元素");
        }
    } catch (error) {
        console.error("更新刻辰信息时出错:", error);
    }
}

// 获取时辰对应的分段
function getBranchPart(branch) {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    return getBranchPartByTime(branch, hour, minute);
}

// 获取时辰的开始小时
function getStartHourForBranch(branch) {
    switch (branch) {
        case "子": return 23; // 23:00-00:59
        case "丑": return 1;  // 01:00-02:59
        case "寅": return 3;  // 03:00-04:59
        case "卯": return 5;  // 05:00-06:59
        case "辰": return 7;  // 07:00-08:59
        case "巳": return 9;  // 09:00-10:59
        case "午": return 11; // 11:00-12:59
        case "未": return 13; // 13:00-14:59
        case "申": return 15; // 15:00-16:59
        case "酉": return 17; // 17:00-18:59
        case "戌": return 19; // 19:00-20:59
        case "亥": return 21; // 21:00-22:59
        default: return 0;
    }
}

// 获取刻对应的分段
function getKePart(ke) {
    const parts = dizhiParts[ke] || 1;
    if (parts === 1) return 1;
    
    const now = new Date();
    const minute = now.getMinutes();
    // 每10分钟是一个刻，刻内没有再分段
    return 1;
}

// 获取星司名称
function getXingsiName(dizhi, part) {
    if (!dizhi || !part) {
        console.error(`获取星司名称失败: 地支=${dizhi}, 部分=${part}`);
        return null;
    }
    
    const key = `${dizhi}-${part}`;
    const star = xingsiNames[key];
    
    if (!star) {
        console.error(`未找到地支${dizhi}第${part}份的星司名称，key=${key}`);
        // 如果找不到精确匹配，返回默认值防止界面崩溃
        return "未知星司";
    }
    
    return star;
}

// 计算六合宫
function calculateLiuheGong(ke) {
    return liuheMap[ke] || ke;  // 如果找不到对应的六合，返回原刻
}

// 计算机锋门
function calculateJifengMen() {
    console.log("开始计算机锋门");
    
    try {
        // 获取当前选择的天盘值
        const tianpanSelect = document.getElementById('tianpan');
        if (!tianpanSelect) {
            console.error("找不到天盘下拉框");
            return null;
        }
        const selectedTianpan = tianpanSelect.value;
        
        // 如果天盘是"无"，则返回空值
        if (selectedTianpan === "无") {
            console.log("天盘为'无'，机锋门计算返回空值");
            return null;
        }
        
        // 计算选择天盘的六合地支
        const liuHeTianpan = liuheMap[selectedTianpan];
        if (!liuHeTianpan) {
            console.error(`找不到天盘${selectedTianpan}的六合关系`);
            return null;
        }
        
        console.log(`天盘${selectedTianpan}的六合是${liuHeTianpan}`);
        
        // 从表格中找到六合地支所在位置的天盘值
        // 构建从地盘到天盘的映射
        const tianpanMap = {};
        
        // 遍历表格单元格，构建地盘->天盘的映射
        dipanOrder.forEach((pos) => {
            const dipanName = pos.name;
            const cellElement = document.getElementById(`fill-${pos.row}-${pos.col}`);
            
            if (cellElement && cellElement.textContent) {
                tianpanMap[dipanName] = cellElement.textContent;
                console.log(`地盘${dipanName} -> 天盘${cellElement.textContent}`);
            }
        });
        
        // 从地盘映射中找到六合地支对应的天盘值
        const jifengTianpan = tianpanMap[liuHeTianpan] || "无";
        const jifengDipan = liuHeTianpan;
        
        console.log(`机锋门: 天盘=${jifengTianpan}, 地盘=${jifengDipan}`);
        
        return {
            tianpan: jifengTianpan,
            dipan: jifengDipan
        };
    } catch (error) {
        console.error("计算机锋门时出错:", error);
        return null;
    }
}

// 计算星司机锋门
function calculateXingsiJifengMen() {
    try {
        console.log("计算星司机锋门");
        
        // 获取机锋门的天盘和地盘
        const jifengMen = calculateJifengMen();
        
        if (!jifengMen || !jifengMen.tianpan || !jifengMen.dipan) {
            console.log("机锋门计算结果为空，无法计算星司机锋门");
            return null;
        }
        
        // 获取机锋门天盘和地盘对应的星司
        const tianpanXingsi = getXingsiForDiZhi(jifengMen.tianpan);
        const dipanXingsi = getXingsiForDiZhi(jifengMen.dipan);
        
        if (!tianpanXingsi || !dipanXingsi) {
            console.log("无法获取机锋门天地盘对应的星司");
            return null;
        }
        
        console.log(`机锋门星司: 天盘=${jifengMen.tianpan}(${tianpanXingsi.star}), 地盘=${jifengMen.dipan}(${dipanXingsi.star})`);
        
        return {
            tianpanStar: tianpanXingsi.star,
            dipanStar: dipanXingsi.star,
            tianpanPart: tianpanXingsi.part,
            dipanPart: dipanXingsi.part
        };
    } catch (error) {
        console.error("计算星司机锋门时出错:", error);
        return null;
    }
}

// 获取指定地支的星司
function getXingsiForDiZhi(dizhi) {
    if (!dizhi || dizhi === "无") {
        console.log(`地支为空或"无"，无法获取星司`);
        return null;
    }
    
    try {
        // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // 计算地支所在的部分
        const part = getBranchPartByTime(dizhi, hour, minute);
        
        // 获取对应的星司名称
        const star = getXingsiName(dizhi, part);
        
        if (!star) {
            console.error(`未能获取到地支${dizhi}第${part}份的星司名称`);
            return null;
        }
        
        console.log(`地支${dizhi}的第${part}份对应星司: ${star}`);
        
        return { part: part, star: star };
    } catch (error) {
        console.error(`获取地支${dizhi}星司时出错:`, error);
        return null;
    }
}

// 更新星司信息显示
function updateXingsiInfo() {
    console.log("开始更新星司信息");
    
    try {
        // 获取当前时间、时辰和刻
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentBranch = getCurrentTimeBranch();
        const currentKe = getCurrentKe();
        
        console.log(`当前时间: ${currentHour}:${currentMinute}, 时辰: ${currentBranch}, 刻: ${currentKe}`);
        
        // 计算当前时辰的星司
        const branchPart = getBranchPartByTime(currentBranch, currentHour, currentMinute);
        const branchStar = getXingsiName(currentBranch, branchPart);
        const branchStarNumber = xingsiNumberMap[branchStar];
        
        console.log(`时辰星司计算: ${currentBranch} 第${branchPart}份 -> ${branchStar}(${branchStarNumber})`);
        
        // 计算当前刻的星司
        // 由于刻只有一份，因此部分始终为1
        const keStar = getXingsiName(currentKe, 1);
        const keStarNumber = xingsiNumberMap[keStar];
        
        console.log(`刻星司计算: ${currentKe} 第1份 -> ${keStar}(${keStarNumber})`);
        
        // 获取星司详情UI元素
        const branchStarElement = document.getElementById("shi-star");
        const keStarElement = document.getElementById("ke-star");
        
        // 检查UI元素
        console.log(`UI元素检查: branchStarElement=${!!branchStarElement}, keStarElement=${!!keStarElement}`);
        
        // 更新星司详情UI显示
        if (branchStarElement) {
            const starNumber = branchStarNumber ? ` (${branchStarNumber})` : '';
            branchStarElement.textContent = `${branchStar}${starNumber}`;
            console.log(`已更新时辰星司显示: ${branchStar}${starNumber}`);
        } else {
            console.error("未找到时星司元素");
        }
        
        if (keStarElement) {
            const starNumber = keStarNumber ? ` (${keStarNumber})` : '';
            keStarElement.textContent = `${keStar}${starNumber}`;
            console.log(`已更新刻星司显示: ${keStar}${starNumber}`);
        } else {
            console.error("未找到刻星司元素");
        }
        
        console.log("星司信息更新完成");
    } catch (error) {
        console.error("更新星司信息时出错:", error);
    }
}

// 根据指定时间获取时辰
function getTimeBranchByHourMinute(hour, minute) {
    if (hour >= 23 || hour < 1) return "子";
    if (hour >= 1 && hour < 3) return "丑";
    if (hour >= 3 && hour < 5) return "寅";
    if (hour >= 5 && hour < 7) return "卯";
    if (hour >= 7 && hour < 9) return "辰";
    if (hour >= 9 && hour < 11) return "巳";
    if (hour >= 11 && hour < 13) return "午";
    if (hour >= 13 && hour < 15) return "未";
    if (hour >= 15 && hour < 17) return "申";
    if (hour >= 17 && hour < 19) return "酉";
    if (hour >= 19 && hour < 21) return "戌";
    if (hour >= 21 && hour < 23) return "亥";
    return "子";
}

// 根据指定时间获取时辰分段
function getBranchPartByTime(branch, hour, minute) {
    try {
        console.log(`计算地支${branch}在时间${hour}:${minute}的部分...`);
        
        // 获取地支对应的总份数
        const totalParts = dizhiParts[branch] || 1;
        console.log(`地支${branch}共有${totalParts}份`);
        
        // 处理特殊情况：子时跨越两天，需要特别处理
        if (branch === "子") {
            // 子时: 23:00-01:00，跨越两天
            const totalMinutes = 120; // 子时总共120分钟
            let minutesPassedInZi;
            
            if (hour === 23) {
                // 23:00-23:59，子时前半段
                minutesPassedInZi = minute;
            } else if (hour === 0) {
                // 00:00-00:59，子时中段
                minutesPassedInZi = 60 + minute;
            } else {
                // 01:00，子时末尾（虽然01:00通常已经是丑时的开始，但可能有边界情况）
                minutesPassedInZi = 120;
            }
            
            // 计算所在的部分
            const partDuration = totalMinutes / totalParts;
            let currentPart = Math.floor(minutesPassedInZi / partDuration) + 1;
            
            // 确保部分在有效范围内
            if (currentPart > totalParts) currentPart = totalParts;
            if (currentPart < 1) currentPart = 1;
            
            console.log(`子时特殊处理: ${hour}:${minute} -> 第${currentPart}/${totalParts}份`);
            return currentPart;
        }
        
        // 其他地支的情况（每个时辰2小时）
        const branchHourMap = {
            "丑": 1, "寅": 3, "卯": 5, "辰": 7, "巳": 9, 
            "午": 11, "未": 13, "申": 15, "酉": 17, "戌": 19, "亥": 21
        };
        
        const startHour = branchHourMap[branch];
        if (startHour === undefined) {
            console.error(`未知的地支: ${branch}`);
            return 1; // 默认返回第1份
        }
        
        // 计算当前时间在该地支中经过的分钟数
        const totalMinutes = 120; // 每个时辰2小时
        let minutesPassed;
        
        if (hour === startHour) {
            // 在时辰的第一个小时
            minutesPassed = minute;
        } else if (hour === startHour + 1) {
            // 在时辰的第二个小时
            minutesPassed = 60 + minute;
        } else {
            console.error(`时间${hour}:${minute}不在地支${branch}范围内`);
            return 1; // 默认返回第1份
        }
        
        // 计算所在的部分
        const partDuration = totalMinutes / totalParts;
        let currentPart = Math.floor(minutesPassed / partDuration) + 1;
        
        // 确保部分在有效范围内
        if (currentPart > totalParts) currentPart = totalParts;
        if (currentPart < 1) currentPart = 1;
        
        console.log(`计算结果: 地支${branch}在时间${hour}:${minute} -> 第${currentPart}/${totalParts}份`);
        return currentPart;
    } catch (error) {
        console.error(`计算地支${branch}部分时出错:`, error);
        return 1; // 出错时默认返回第1份
    }
}

// 验证特定时间点的星司计算
function verifySpecificTimes() {
    // 验证未时的各个分段
    let testTimes = [
        {hour: 13, minute: 10, expected: 1},  // 未时第1份
        {hour: 13, minute: 40, expected: 2},  // 未时第2份
        {hour: 14, minute: 24, expected: 2},  // 未时第2份 - 您的案例
        {hour: 14, minute: 40, expected: 3},  // 未时第3份
    ];
    
    console.log("===== 验证未时分段 =====");
    testTimes.forEach(test => {
        const branch = "未";
        const part = getBranchPartByTime(branch, test.hour, test.minute);
        const star = getXingsiName(branch, part);
        console.log(`时间 ${test.hour}:${test.minute.toString().padStart(2, '0')} - 计算份数: ${part}, 期望份数: ${test.expected}, 星司: ${star}`);
    });
    
    // 验证当前时间
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentBranch = getCurrentTimeBranch();
    const currentPart = getBranchPartByTime(currentBranch, currentHour, currentMinute);
    const currentStar = getXingsiName(currentBranch, currentPart);
    
    console.log("===== 当前时间分段 =====");
    console.log(`当前时间: ${currentHour}:${currentMinute.toString().padStart(2, '0')}`);
    console.log(`时辰: ${currentBranch}, 计算份数: ${currentPart}, 星司: ${currentStar}`);
    
    // 计算每个时辰各份对应的分钟范围
    console.log("===== 时辰分段时间范围 =====");
    Object.keys(dizhiParts).forEach(branch => {
        const parts = dizhiParts[branch];
        if (parts === 1) {
            console.log(`${branch}时(1份): ${branch}-1 -> ${getXingsiName(branch, 1)}`);
            return;
        }
        
        const startHour = getStartHourForBranch(branch);
        const totalMinutes = 120; // 时辰总分钟数
        const minutesPerPart = totalMinutes / parts;
        
        console.log(`${branch}时(${parts}份):`);
        for (let i = 1; i <= parts; i++) {
            const partStartMinute = Math.floor((i - 1) * minutesPerPart);
            const partEndMinute = Math.floor(i * minutesPerPart) - 1;
            
            // 计算开始时间
            const startHourOffset = Math.floor(partStartMinute / 60);
            const startMinuteDisplay = partStartMinute % 60;
            const startTimeHour = (startHour + startHourOffset) % 24;
            
            // 计算结束时间
            const endHourOffset = Math.floor(partEndMinute / 60);
            const endMinuteDisplay = partEndMinute % 60;
            const endTimeHour = (startHour + endHourOffset) % 24;
            
            const formatTime = (h, m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
            const timeRange = `${formatTime(startTimeHour, startMinuteDisplay)} - ${formatTime(endTimeHour, endMinuteDisplay)}`;
            
            console.log(`  第${i}份: ${timeRange} -> ${branch}-${i} -> ${getXingsiName(branch, i)}`);
        }
    });
}

// 计算天盘值（根据刻柱.txt规则）
function calculateTianPan(dipanValue) {
    // 地盘与天盘的对应关系（按照刻柱.txt）
    const dipanToTianpan = {
        "子": "午",
        "丑": "未",
        "寅": "申",
        "卯": "酉",
        "辰": "戌",
        "巳": "亥",
        "午": "子",
        "未": "辰", // 修正：未对应辰
        "申": "寅",
        "酉": "卯",
        "戌": "辰",
        "亥": "巳"
    };
    
    // 返回对应的天盘值，如果没找到则返回默认值
    return dipanToTianpan[dipanValue] || "子";
}

// 根据刻计算天盘
function calculateTianPanFromKe(ke) {
    // 刻与天盘的对应关系（从刻柱.txt提取）
    // 子刻 → 子天盘, 丑刻 → 丑天盘, 寅刻 → 寅天盘, 卯刻 → 卯天盘
    // 辰刻 → 辰天盘, 巳刻 → 巳天盘, 午刻 → 无天盘, 未刻 → 未天盘
    // 申刻 → 申天盘, 酉刻 → 酉天盘, 戌刻 → 戌天盘, 亥刻 → 亥天盘
    
    console.log(`根据刻[${ke}]计算天盘`);
    
    // 特殊情况：午刻对应"无"天盘
    if (ke === "午") {
        return "无";
    }
    
    // 其他刻名直接对应天盘名
    return ke;
}

// 更新时间显示和下拉框选择
function updateTimeDisplay() {
    console.log("开始更新时间显示");
    
    try {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // 获取当前时辰和刻
        const currentBranch = getCurrentTimeBranch();
        const currentKe = getCurrentKe();
        
        // 根据当前刻计算天盘
        const currentTianPan = calculateTianPanFromKe(currentKe);
        
        console.log(`当前时间: ${hour}:${minute.toString().padStart(2, '0')}`);
        console.log(`当前时辰: ${currentBranch}, 当前刻: ${currentKe}`);
        console.log(`根据刻计算的天盘: ${currentTianPan}`);
        
        // 更新下拉框选择（但不触发表格更新）
        const tianpanSelect = document.getElementById('tianpan');
        const dipanSelect = document.getElementById('dipan');
        
        // 检查元素是否存在
        if (tianpanSelect) {
            tianpanSelect.value = currentTianPan; // 天盘根据当前刻设置
        } else {
            console.error("未找到天盘下拉框元素");
        }
        
        if (dipanSelect) {
            dipanSelect.value = currentBranch;   // 地盘根据当前时辰设置
        } else {
            console.error("未找到地盘下拉框元素");
        }
        
        // 更新当前时间显示
        const currentTimeElement = document.getElementById('current-time');
        const currentBranchElement = document.getElementById('current-branch');
        
        if (currentTimeElement) {
            currentTimeElement.textContent = `${hour}:${minute.toString().padStart(2, '0')}`;
        } else {
            console.error("未找到current-time元素");
        }
        
        if (currentBranchElement) {
            currentBranchElement.textContent = currentBranch + "时";
        } else {
            console.error("未找到current-branch元素");
        }
        
        // 更新刻辰信息
        updateKeInfo();
        
        if (tianpanSelect && dipanSelect) {
            console.log(`下拉框已设置: 天盘=${tianpanSelect.value}, 地盘=${dipanSelect.value}`);
        }
        
        console.log("时间显示更新完成");
    } catch (error) {
        console.error("更新时间显示时出错:", error);
    }
}

// 更新机锋门显示
function updateJifengMen() {
    console.log("更新机锋门信息");
    
    try {
        // 计算机锋门
        const jifengMen = calculateJifengMen();
        
        // 更新机锋门显示
        const jifengTianpanElement = document.getElementById('jifeng-tianpan');
        const jifengDipanElement = document.getElementById('jifeng-dipan');
        const jifengResultElement = document.getElementById('jifeng-result');
        
        if (jifengTianpanElement && jifengDipanElement) {
            if (jifengMen && jifengMen.tianpan && jifengMen.dipan) {
                jifengTianpanElement.textContent = jifengMen.tianpan;
                jifengDipanElement.textContent = jifengMen.dipan;
                
                // 更新结果显示
                if (jifengResultElement) {
                    jifengResultElement.textContent = `${jifengMen.tianpan}+${jifengMen.dipan}`;
                }
                
                // 显示机锋门卡片
                const jifengCard = document.getElementById('jifeng-card');
                if (jifengCard) {
                    jifengCard.style.display = 'block';
                }
                
                // 更新星司机锋门信息
                updateXingsiJifengMen(jifengMen);
                
                console.log(`机锋门更新为: 天盘=${jifengMen.tianpan}, 地盘=${jifengMen.dipan}`);
            } else {
                jifengTianpanElement.textContent = '无';
                jifengDipanElement.textContent = '无';
                if (jifengResultElement) {
                    jifengResultElement.textContent = '无法计算';
                }
                console.log("机锋门无效，设置为'无'");
            }
        } else {
            console.error("未找到机锋门元素");
        }
    } catch (error) {
        console.error("更新机锋门时出错:", error);
    }
}

// 更新星司机锋门信息
function updateXingsiJifengMen(jifengMen) {
    console.log("更新星司机锋门信息");
    
    try {
        if (!jifengMen) {
            console.error("机锋门数据为空，无法更新星司机锋门");
            return;
        }
        
        // 获取星司结果元素
        const xingsiResultElement = document.getElementById("xingsi-result");
        const xingsiResultNumbersElement = document.getElementById("xingsi-result-numbers");
        
        if (!xingsiResultElement || !xingsiResultNumbersElement) {
            console.error("未找到星司结果元素");
            return;
        }
        
        // 获取天盘星司
        let tianpanStar = null;
        let tianpanStarNumber = null;
        
        if (jifengMen.tianpan && jifengMen.tianpan !== "无") {
            const tianpanXingsi = getXingsiForDiZhi(jifengMen.tianpan);
            if (tianpanXingsi && tianpanXingsi.star) {
                tianpanStar = tianpanXingsi.star;
                tianpanStarNumber = xingsiNumberMap[tianpanStar];
                console.log(`天盘星司: ${tianpanStar}(${tianpanStarNumber})`);
            }
        }
        
        // 获取地盘星司
        const dipanXingsi = getXingsiForDiZhi(jifengMen.dipan);
        
        if (!dipanXingsi || !dipanXingsi.star) {
            console.error(`无法获取地盘${jifengMen.dipan}的星司`);
            xingsiResultElement.textContent = "无法计算";
            xingsiResultNumbersElement.textContent = "无法计算";
            return;
        }
        
        const dipanStar = dipanXingsi.star;
        const dipanStarNumber = xingsiNumberMap[dipanStar];
        console.log(`地盘星司: ${dipanStar}(${dipanStarNumber})`);
        
        // 更新星司结果显示
        if (tianpanStar) {
            xingsiResultElement.textContent = `${tianpanStar} + ${dipanStar}`;
            xingsiResultNumbersElement.textContent = `${tianpanStarNumber || "?"} + ${dipanStarNumber || "?"}`;
        } else {
            xingsiResultElement.textContent = dipanStar;
            xingsiResultNumbersElement.textContent = dipanStarNumber || "?";
        }
        
        // 显示星司卡片
        const xingsiCard = document.getElementById('xingsi-card');
        if (xingsiCard) {
            xingsiCard.style.display = 'block';
        }
        
        console.log("星司机锋门信息更新完成");
    } catch (error) {
        console.error("更新星司机锋门时出错:", error);
    }
}

// 计算推字结果
function calculateTuizi() {
    console.log("开始计算推字");
    
    try {
        // 获取机锋门的天盘星司和地盘星司
        const jifengResult = calculateJifengMen();
        if (!jifengResult) {
            console.error("无法计算机锋门，无法推字");
            return null;
        }
        
        // 获取当前时间
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // 获取当前的天盘和地盘
        const tianpan = jifengResult.tianpan;
        const dizhi = jifengResult.dipan;
        
        console.log(`机锋门天地盘: 天盘=${tianpan}, 地盘=${dizhi}`);
        
        // 如果天盘是"无"，则无法计算推字
        if (tianpan === "无") {
            console.warn("天盘为'无'，无法计算推字");
            return {
                tianpanXingsi: null,
                tianpanNumber: null,
                dizhiXingsi: getXingsiForDiZhi(dizhi).star,
                dizhiNumber: xingsiNumberMap[getXingsiForDiZhi(dizhi).star],
                tuiziIndex: null,  // 不进行数字计算
                tuiziList: []
            };
        }
        
        // 获取天盘对应的星司和推字列表
        const tianpanXingsi = getXingsiForDiZhi(tianpan);
        const tianpanXingsiName = tianpanXingsi.star;
        const tianpanNumber = xingsiNumberMap[tianpanXingsiName];
        
        // 获取地盘对应的星司和数字
        const dizhiXingsi = getXingsiForDiZhi(dizhi);
        const dizhiXingsiName = dizhiXingsi.star;
        const dizhiNumber = xingsiNumberMap[dizhiXingsiName];
        
        // 获取天盘星司对应的推字列表
        const tuiziList = xingsiTuiziMap[tianpanXingsiName] || [];
        if (tuiziList.length === 0) {
            console.error(`未找到天盘星司 ${tianpanXingsiName} 对应的推字列表`);
            return null;
        }
        
        // 检查是否获取到星司数字
        if (!dizhiNumber) {
            console.error(`未找到地盘星司对应的数字: ${dizhiXingsiName}`);
            return null;
        }
        
        console.log(`推字计算: 天盘=${tianpan}(星司=${tianpanXingsiName}, 数字=${tianpanNumber}), 地盘=${dizhi}(星司=${dizhiXingsiName}, 数字=${dizhiNumber})`);
        
        // 检查是他占还是自占
        const isTaZhan = document.getElementById('taZhan').checked;
        
        // 计算推字索引：使用地盘星司的数字从天盘星司的推字列表中找
        // 他占顺数，自占逆数
        let tuiziIndex;
        if (isTaZhan) {
            // 他占：顺数 - 从1开始计数，所以-1
            tuiziIndex = (dizhiNumber - 1) % tuiziList.length;
            console.log(`他占顺数: 地盘星司数${dizhiNumber} -> 在天盘星司(${tianpanXingsiName})推字列表中索引 ${tuiziIndex}`);
        } else {
            // 自占：逆数
            tuiziIndex = (tuiziList.length - (dizhiNumber % tuiziList.length)) % tuiziList.length;
            if (dizhiNumber % tuiziList.length === 0) {
                tuiziIndex = 0; // 如果能整除，应该是第一个字
            }
            console.log(`自占逆数: 地盘星司数${dizhiNumber} -> 在天盘星司(${tianpanXingsiName})推字列表中索引 ${tuiziIndex}`);
        }
        
        return {
            tianpanXingsi: tianpanXingsiName,
            tianpanNumber: tianpanNumber,
            dizhiXingsi: dizhiXingsiName,
            dizhiNumber: dizhiNumber,
            tuiziIndex: tuiziIndex,
            tuiziList: tuiziList
        };
    } catch (error) {
        console.error("计算推字时出错:", error);
        return null;
    }
}

// 更新推字信息
function updateTuiziInfo() {
    console.log("开始更新推字信息");
    
    try {
        // 计算推字
        const tuiziResult = calculateTuizi();
        
        // 获取推字显示元素
        const tuiziSection = document.getElementById('tuizi-card');
        
        if (!tuiziSection) {
            console.error("未找到推字卡片元素");
            return;
        }
        
        // 如果无法计算推字，显示错误信息
        if (!tuiziResult) {
            console.warn("无法计算推字结果");
            tuiziSection.innerHTML = `
                <div class="card-header bg-danger text-white">推字结果</div>
                <div class="card-body">
                    <p class="mb-0">无法计算推字，请先排盘。</p>
                </div>
            `;
            return;
        }
        
        console.log("推字计算结果:", tuiziResult);
        
        // 准备推字结果显示
        let tuiziContent = '';
        
        // 如果天盘为"无"，则无法推字
        if (!tuiziResult.tianpanXingsi) {
            console.log("天盘为'无'，无法推字");
            tuiziContent = `
                <div class="alert alert-warning mb-2">
                    <strong>天盘为"无"</strong>，无法计算推字。
                </div>
            `;
        } else {
            // 获取计算出的推字
            const tuiziIndex = tuiziResult.tuiziIndex;
            
            // 确保索引有效
            if (tuiziIndex === undefined || tuiziIndex < 0 || tuiziIndex >= tuiziResult.tuiziList.length) {
                console.error(`无效的推字索引: ${tuiziIndex}, 列表长度: ${tuiziResult.tuiziList.length}`);
                tuiziContent = `
                    <div class="alert alert-danger mb-2">
                        <strong>计算错误</strong>：无效的推字索引 ${tuiziIndex}。
                    </div>
                `;
            } else {
                const tuiziWord = tuiziResult.tuiziList[tuiziIndex];
                const isTaZhan = document.getElementById('taZhan').checked;
                
                console.log(`推字结果: 索引=${tuiziIndex}, 字="${tuiziWord}", 占法=${isTaZhan ? '他占(顺数)' : '自占(逆数)'}`);
                
                tuiziContent = `
                    <div class="alert alert-info mb-2">
                        <div><strong>机锋门天盘星司:</strong> ${tuiziResult.tianpanXingsi} (No.${tuiziResult.tianpanNumber})</div>
                        <div><strong>机锋门地盘星司:</strong> ${tuiziResult.dizhiXingsi} (No.${tuiziResult.dizhiNumber})</div>
                        <div><strong>推字规则:</strong> 用地盘星司数(${tuiziResult.dizhiNumber})在天盘星司推字表中${isTaZhan ? '顺' : '逆'}数</div>
                    </div>
                    <div class="result-box my-3 p-3 border rounded text-center">
                        <span class="result-word fs-2">${tuiziWord}</span>
                    </div>
                    <div class="small text-muted mb-2">天盘星司(${tuiziResult.tianpanXingsi})对应推字列表:</div>
                    <div class="tuizi-list small">
                        ${tuiziResult.tuiziList.map((word, idx) => 
                            `<span class="badge ${idx === tuiziIndex ? 'bg-primary' : 'bg-light text-dark'} me-1 mb-1">${word}</span>`
                        ).join('')}
                    </div>
                `;
            }
        }
        
        // 更新推字卡片内容
        tuiziSection.innerHTML = `
            <div class="card-header bg-info text-white">推字结果</div>
            <div class="card-body">
                ${tuiziContent}
            </div>
        `;
        
        console.log("推字信息更新完成");
    } catch (error) {
        console.error("更新推字信息时出错:", error);
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面加载完成，开始初始化");
    
    try {
        // 确保星司数据已初始化
        initXingsiData();
        
        // 初始化下拉框
        initDropdowns();
        
        // 更新当前时间显示
        updateTimeDisplay();
        
        // 显示星司卡片
        const xingsiCard = document.getElementById('xingsi-card');
        if (xingsiCard) {
            xingsiCard.style.display = 'block';
        }
        
        // 添加下拉框变化事件监听
        const tianpan = document.getElementById('tianpan');
        const dipan = document.getElementById('dipan');
        
        if (tianpan) {
            tianpan.addEventListener('change', function() {
                console.log(`天盘变更为 ${this.value}`);
            });
        }
        
        if (dipan) {
            dipan.addEventListener('change', function() {
                console.log(`地盘变更为 ${this.value}`);
            });
        }
        
        // 添加排盘按钮事件监听
        const paipanBtn = document.getElementById('paipan-btn');
        if (paipanBtn) {
            paipanBtn.addEventListener('click', function() {
                console.log("点击排盘按钮");
                updateTable();
            });
        }
        
        // 添加刷新时间按钮事件监听
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                console.log("点击刷新时间按钮");
                updateTimeDisplay();
            });
        }
        
        // 定时检查时间变化
        setInterval(() => {
            const now = new Date();
            const currentMinute = now.getMinutes();
            const lastMinute = lastCheckedTime ? lastCheckedTime.getMinutes() : -1;
            
            if (currentMinute !== lastMinute) {
                console.log("分钟变化，更新时间");
                updateTimeDisplay();
                lastCheckedTime = now;
            }
        }, 1000);
        
        console.log("初始化完成");
    } catch (error) {
        console.error("初始化过程中出错:", error);
    }
});

// 初始化星司数据
function initXingsiData() {
    console.log("初始化星司数据...");
    
    try {
        // 确保星司名称映射已初始化
        if (!xingsiNames || Object.keys(xingsiNames).length === 0) {
            console.error("星司名称映射未初始化，使用硬编码数据");
            
            // 使用硬编码的星司名称数据作为备份
            xingsiNames = {
                "子-1": "天渊", "子-2": "天桴",
                "丑-1": "天厨", "丑-2": "天垒",
                "寅-1": "天厩", "寅-2": "天罇", "寅-3": "天鸡", "寅-4": "天园", "寅-5": "天溷",
                "卯-1": "天庾", "卯-2": "天仓", "卯-3": "天囷", "卯-4": "天廪",
                "辰-1": "天谗", "辰-2": "天苑", "辰-3": "天阴", "辰-4": "天街", 
                "辰-5": "天潢", "辰-6": "天高", "辰-7": "天船",
                "巳-1": "天关",
                "午-1": "天社", "午-2": "天纪", "午-3": "天狼",
                "未-1": "天庙", "未-2": "天稷", "未-3": "天相",
                "申-1": "天枪",
                "酉-1": "天门", "酉-2": "天田",
                "戌-1": "天江", "戌-2": "天辐",
                "亥-1": "天籥", "亥-2": "天井"
            };
        }
        
        // 确保星司数字映射已初始化
        if (!xingsiNumberMap || Object.keys(xingsiNumberMap).length === 0) {
            console.error("星司数字映射未初始化，使用硬编码数据");
            
            // 使用硬编码的星司数字映射数据作为备份
            xingsiNumberMap = {
                "天渊": "1", "天桴": "2", "天厨": "3", "天垒": "4", 
                "天厩": "5", "天罇": "6", "天鸡": "7", "天园": "8", "天溷": "9",
                "天庾": "10", "天仓": "11", "天囷": "12", "天廪": "13",
                "天谗": "14", "天苑": "15", "天阴": "16", "天街": "17", 
                "天潢": "18", "天高": "19", "天船": "20",
                "天关": "21",
                "天社": "22", "天纪": "23", "天狼": "24",
                "天庙": "25", "天稷": "26", "天相": "27",
                "天枪": "28",
                "天门": "29", "天田": "30",
                "天江": "31", "天辐": "32",
                "天籥": "33", "天井": "34"
            };
        }
        
        // 验证几个关键映射
        console.log(`验证星司映射: 子-1 -> ${xingsiNames["子-1"] || "未找到"}`);
        console.log(`验证星司数字: 天渊 -> ${xingsiNumberMap["天渊"] || "未找到"}`);
        console.log(`验证星司映射: 巳-1 -> ${xingsiNames["巳-1"] || "未找到"}`);
        console.log(`验证星司数字: 天关 -> ${xingsiNumberMap["天关"] || "未找到"}`);
        
        console.log("星司数据初始化完成");
    } catch (error) {
        console.error("初始化星司数据时出错:", error);
    }
}

// 地盘位置定义
const dipanOrder = [
    { row: 1, col: 1, name: "巳" },
    { row: 1, col: 2, name: "午" },
    { row: 1, col: 3, name: "未" },
    { row: 1, col: 4, name: "申" },
    { row: 2, col: 1, name: "辰" },
    { row: 2, col: 4, name: "酉" },
    { row: 3, col: 1, name: "卯" },
    { row: 3, col: 4, name: "戌" },
    { row: 4, col: 1, name: "寅" },
    { row: 4, col: 2, name: "丑" },
    { row: 4, col: 3, name: "子" },
    { row: 4, col: 4, name: "亥" }
];

// 需要填充的单元格ID列表
const fillCells = [
    "fill-1-1", "fill-1-2", "fill-1-3", "fill-1-4", 
    "fill-2-1", "fill-2-4", 
    "fill-3-1", "fill-3-4", 
    "fill-4-1", "fill-4-2", "fill-4-3", "fill-4-4"
];

// 更新表格
function updateTable() {
    console.log("开始更新表格");
    
    try {
        // 获取当前天盘和地盘的值
        const tianpanSelect = document.getElementById('tianpan');
        const dipanSelect = document.getElementById('dipan');
        
        if (!tianpanSelect || !dipanSelect) {
            console.error("无法找到下拉框元素");
            return;
        }
        
        const tianpanValue = tianpanSelect.value;
        const dipanValue = dipanSelect.value;
        
        // 获取占类型（他占/自占）
        const isTaZhan = document.getElementById('taZhan').checked;
        console.log(`占类型: ${isTaZhan ? '他占' : '自占'}`);
        console.log(`更新表格: 天盘=${tianpanValue}, 地盘=${dipanValue}`);
        
        // 清除所有天盘内容
        fillCells.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '';
            } else {
                console.warn(`未找到元素: ${id}`);
            }
        });
        
        // 如果天盘选择"无"，则不填入天盘内容
        if (tianpanValue === "无") {
            console.log("天盘选择为'无'，不填入天盘内容");
            
            // 更新机锋门和星司信息
            updateJifengMen();
            updateXingsiInfo();
            updateTuiziInfo();
            return;
        }
        
        // 计算天盘地盘索引
        const dizhiIndex = dizhi.indexOf(dipanValue);
        const tianpanIndex = dizhi.indexOf(tianpanValue);
        
        if (dizhiIndex === -1 || tianpanIndex === -1) {
            console.error(`无效的地支值: 地盘=${dipanValue}(${dizhiIndex}), 天盘=${tianpanValue}(${tianpanIndex})`);
            return;
        }
        
        // 创建地盘索引到填充值的映射
        const fillValueMap = {};
        
        // 初始化天盘起点索引
        const startTianpanIndex = tianpanIndex;
        
        // 为每个地盘索引计算对应的天盘值
        for (let i = 0; i < 12; i++) {
            // 当前地盘的索引
            const currentDipanIndex = i;
            
            // 计算对应的天盘索引
            // 从起点天盘索引开始，减去偏移量（因为是逆时针）
            // 注意：地盘索引与dizhiIndex的差就是偏移量
            const offset = (currentDipanIndex - dizhiIndex + 12) % 12;
            const currentTianpanIndex = (startTianpanIndex - offset + 12) % 12;
            
            // 存储地盘索引到天盘值的映射
            fillValueMap[currentDipanIndex] = dizhi[currentTianpanIndex];
            
            console.log(`地盘索引${currentDipanIndex}(${dizhi[currentDipanIndex]}) -> 天盘值${dizhi[currentTianpanIndex]}, 偏移量${offset}`);
        }
        
        // 填入天盘内容
        dipanOrder.forEach((pos) => {
            const dipanName = pos.name;
            const dipanIndex = dizhi.indexOf(dipanName);
            
            if (dipanIndex >= 0) {  // 确保地盘有效
                // 获取该地盘位置应填入的天盘值
                const fillTianpanValue = fillValueMap[dipanIndex];
                
                // 填入单元格
                const cellElement = document.getElementById(`fill-${pos.row}-${pos.col}`);
                if (cellElement) {
                    cellElement.textContent = fillTianpanValue;
                } else {
                    console.warn(`未找到单元格元素: fill-${pos.row}-${pos.col}`);
                }
                
                console.log(`填充: 地盘${dipanName}(索引${dipanIndex}) -> 天盘${fillTianpanValue}`);
            }
        });
        
        console.log("表格更新完成");
        
        // 更新机锋门信息
        console.log("开始更新机锋门信息...");
        updateJifengMen();
        
        // 更新星司信息
        console.log("开始更新星司信息...");
        updateXingsiInfo();
        
        // 更新推字信息
        console.log("开始更新推字信息...");
        updateTuiziInfo();
        
        console.log("全部更新完成");
    } catch (error) {
        console.error("更新表格时出错:", error);
    }
}

// 星司推字数据
const xingsiTuiziMap = {
    "天厨": ["占天", "占云", "望云", "郊天", "呼风", "乘风", "占风", "藏水", "占星", "发水", "步月", "赏月", "占月", "曝日", "避日", "吟咏", "冒雪", "踏雪", "玩赏", "望雨", "冒雨", "雨阻", "祷雨", "冒风", "卜雨", "冒雾", "占雾", "望风", "伐水", "望虹电", "占日色", "祷斗", "救火"],
    "天垒": ["烹雪", "祈晴", "占象", "禳火", "察变", "占纬", "惊雷", "惊霜", "畏日", "怨天", "怕风", "伤雨", "觇霓", "伤雹", "占烟霞", "望气", "占河汉", "上疏", "请旨", "草诏", "济世", "闻风声", "唤雨", "役鬼神", "登山", "疏河道", "游名山", "游江湖", "观流泉", "凿池沼", "投江湖", "投河", "投井", "耕田"],
    "天渊": ["囊沙", "出行", "罢市", "就封", "争城", "咒水", "扫地", "入山", "攻城", "扫墓", "课石", "开市", "设镇", "凿井", "泛海", "叛国", "游水", "纹身", "安邦", "刻木", "入境", "归家", "问津", "扼险", "渡江", "登基", "立国", "铭碑", "渡济", "筑园", "铸铳", "割地", "涉水", "筑城"],
    "天桴": ["毁城", "迁城", "据城", "择邻", "望尘", "避乱", "逃难", "汲水", "饮水", "假道", "附国", "迁移", "渡关", "防胡", "申文", "请详", "解犯", "劈冤", "决囚", "伐国", "击敌", "战场", "操演", "试场", "防边", "防海", "防奸", "通番", "防江", "防港", "辞权", "专恣", "成功", "当权"],
    "天籥": ["争奇", "握令", "布法", "门巧", "失势", "犯禁", "纪功", "作成", "回驾", "乘势", "贺岁", "贺喜", "贺寿", "迎春", "迎喜", "寻春", "防秋", "防夜", "巡更", "趋时", "占年", "避暑", "守岁", "贺节岁", "赛社", "待漏", "护月", "护日", "占气", "占时", "玩景", "告朔", "御冬", "置降"],
    "天井": ["造历", "颁历", "祈社", "忧时", "欢世", "赌博", "财迷", "安葬", "选坟", "炼药", "炼丹", "春耕", "秋荐", "夜读", "早起", "夜行", "书寝", "晓行", "夜渔", "春试", "秋试", "秋敛", "春荐", "冬狩", "昏定", "秋省", "晨省", "时祭", "夙念", "病疾", "怨恨", "思忆", "愁寒", "乘凉"],
    "天江": ["望财", "忧旱", "踏青", "一数", "释奠", "祀先", "驱岁", "秋迁", "春迁", "山居", "二数", "水战", "驿宿", "飞递", "野合", "乡饮", "饥寒", "避暑", "贫苦", "乞丐", "保暖", "呼童", "求贤", "求官", "求名", "称臣", "面望", "安民", "吞兵", "引兵", "求仙", "邀赏", "三数", "重三"],
    "天辐": ["重二", "重一", "延师", "从军", "访友", "盟誓", "求签", "问筶", "算命", "行医", "求医", "服药", "少祟", "卖卜", "择友", "取士", "出任", "拜将", "代父", "教子", "亲病", "告病", "告老", "致仕", "出戍", "拜相", "交友", "约交", "辅孤", "托孤", "见贤", "纳客", "纳贤", "四数"],
    "天门": ["益兵", "大败", "进兵", "谪贬", "犒赏", "寻亲", "寻兄", "寻友", "买佣", "买婢", "买婢佣", "重四", "寻弟子", "寻幼婢", "寻亲戚", "娶妻", "纳妾", "生子", "娶媳", "婚聘", "结姻", "生孙", "逐婢奸", "弹奸", "攻盗", "捉贼", "出首", "作吏", "词讼", "为僧", "为道", "官差", "合伙"],
    "天田": ["投书", "交易", "托人", "栽种", "寻迹", "观海", "尽难", "自刎", "自缢", "烹茶", "看花", "赏花", "吟咏", "祭旗", "招兵", "积粮", "积草", "买马", "置甲", "蒸梨", "蒸饭", "烹葵", "烹财", "作韲", "种兰蕙", "植树木", "种菊", "食果", "纳票", "征粮", "刈麦", "种麦", "请俸", "纳课"],
    "天枪": ["罚俸", "采药", "伐木", "赏玩", "采桑", "结茅", "负薪", "樵材", "种蔬", "采茶", "揲著", "捆履", "织席", "织布", "折花", "眼草", "插秧", "扳柳", "刈稻", "炊麦", "煮饭", "戽水", "耘草", "下种", "灌田", "编蒲", "卖花", "杖藜", "收谷", "芟荆", "编籬", "获奸", "造弓", "造箭"],
    "天庙": ["掩扉", "婚姻", "阴私", "窃盗", "烹炰", "骑驴", "牵羊", "骑马", "骑骡", "囊萤", "观凫", "哇井", "遇虎", "遇狼", "遇熊", "犬咬", "画虎", "射虎", "奠雁", "逐鹿", "策马", "饲马", "射兽", "射禽", "虎伤", "石伤", "砲伤", "刀弩伤", "刀枪伤", "放鹤", "救蚁", "画龙", "写书", "钓鱼"],
    "天稷": ["牧羊", "五数", "重五", "割鸡", "斩蛇", "斗鸡", "牧牛", "捕蝗", "听蝉", "扑萤", "狎鸥", "饲蚕", "放鹰", "猎禽", "走狗", "遗物", "买鱼", "提鹅", "提笼", "提禽", "罗雀", "批鳞", "挥毫", "焚膏", "插血", "剪综", "筑岸", "观燕", "食鱼", "献难", "扑螺", "牵豚", "画马", "饮马"],
    "天相": ["筑坝", "筑塘", "牵磨", "耕田", "登楼", "登台", "开门", "闭门", "鼓门", "凭栏", "掀窗", "临轩", "关窗", "开仓", "建阁", "入阁", "逾城", "修城", "修墙", "筑墙", "逾墙", "修桥", "临桥", "上殿", "下殿", "辟户", "凿牖", "起屋", "为工", "学匠", "凿壁", "挖洞", "造桥", "开门"],
    "天社": ["立庙", "治郡", "治邑", "作令", "置地", "置田地", "复国", "灭国", "背国", "下狱", "六数", "重六", "七数", "重七", "决狱", "出狱", "越牢", "祀灶", "作灶", "筑垒", "掘塜", "造塔", "上楼", "下楼", "卧楼", "立祠", "结庐", "过房", "承继", "立嗣", "争屋", "创宇", "登仓廪", "赈救"],
    "天纪": ["筑城", "破城", "守城", "入手", "排闼", "焚烧", "劫掠", "丈量", "权衡", "开馆", "锁户", "锁厨厢", "扬鞭", "开帘", "垂帘", "弹琴", "弹筝", "吹笙", "吹箫", "鸣钟", "吹竽", "造船", "撑船", "执篙", "登舟", "张帆", "掀蓬", "收帆", "扎篙", "告状", "奔宪", "御状", "通状", "垂纶"],
    "天狼": ["收缗", "持杆", "乘桴", "穿针", "敲针", "携樽", "磨针", "八数", "衔杯", "提壶", "投壶", "双陆", "开牌", "持瓶", "敲基", "重八", "乘车", "掷骰", "持筇", "荷锄", "张弓", "携灯", "挑灯", "燃灯", "重九", "重十", "衔枚", "移文", "咨文", "拈阄", "挥戈", "剔旌", "埋锅", "九数"],
    "天关": ["三七", "五五", "安营", "扎寨", "扎刀", "悬刀", "十数", "操刀", "抽签", "四六", "廿六", "登梯", "披蓑", "戴笠", "戴箭", "摇铃", "添筹", "操戈", "廿四", "三九", "焚香", "进香", "祀佛", "拜忏", "念经", "念佛", "用刑", "廿三", "四七", "夹打", "修玄", "炼丹", "设帐", "设榻"],
    "天谗": ["重五", "廿九", "收鲁", "鸣笳", "关灯", "造铠", "铸剑", "舞剑", "佩剑", "淫嫖十三", "握笔", "洗砚", "骨牌", "裁纸", "挈盒", "举盏", "举著", "买笔砚", "折写十七", "买纸", "写帖", "品笛", "鼓琴", "擂鼓", "鸣金", "击磬", "作乐", "赞造十九", "掌号", "收军", "退军", "买器", "收放缆", "结网"],
    "天苑": ["撒网", "社饵", "荷箦", "使棒", "整辔", "并驾", "照镜", "秉烛", "灭烛", "得印", "用印", "放火", "吃打", "打劫", "盗印", "铸印", "颁印", "允详", "剥勘", "打弹冒刃", "执戟", "揭榜", "看榜", "张喻", "合卺", "扎箭", "挽弩", "中箭", "发矢", "负耒耜", "歇肩", "挑担", "设椅"],
    "天阴": ["击缶", "披甲", "卸甲", "运斧", "仗钺", "仗节", "扎帜", "举帜", "设席", "卖器", "卖物", "索取", "磨刀", "看书", "作文", "修史", "献策", "铸器械", "举鼎", "击石", "垒石", "负笈", "奠枕", "持扇", "写扇", "磨墨", "画扇", "洗爵", "破斧", "涤斧", "运甓", "执器械", "执器棍", "遇贼用"],
    "天街": ["五六", "秉笏", "放砲", "写字", "秉钺", "拥彗", "挕屐", "挂锡", "涤器", "数目三十一", "解报", "罚觥", "卖买", "买畜", "置器", "数筹", "借力", "借虎", "四八", "五七", "打牌", "借器", "打器", "摹帖", "荷氊", "捣帖", "拥犁", "三十三", "四十二", "踞床", "坐椅凳", "续弦", "坐枱", "坐轿"],
    "天潢": ["六六", "锄泥", "踢球", "探囊", "飞剑", "开匣", "藏物", "移案", "传箭", "传檄", "推毂", "锁簟", "振驿", "磨刀", "撑伞", "掌扇", "雕字", "锁印", "开柜", "藏柜", "同榻", "同筵席", "各爨", "同舟", "同笔砚", "分席", "功名", "科第", "谋求", "文章", "勋劳", "方能", "事业", "藏噐"],
    "天高": ["死葬", "冠笄", "斋戒", "祭祀", "德望", "器识", "受戒", "度量", "气概", "爵禄", "品秩", "封诰", "赠谥", "法度", "智谋", "纪罔", "典型", "买盗贩脏", "私盐诈陷", "范模", "流品", "韬略", "名誉", "忠直", "孝顺", "机变", "行伍", "生涯", "活计", "靠人", "雇工", "福分", "本分", "消息"],
    "天船": ["傲慢", "嬉笑", "戏谑", "嘲笑", "告假", "探吊", "进谒", "往聘", "往拜", "借物", "赴试", "应选", "过访", "梦惊", "梦魇", "隐居", "追求", "行寻", "坐视", "求荐", "求贷", "借器", "从仕", "醉到", "趋进", "扶归", "召饮", "饯行", "赐宴", "召对", "聘问", "擢用", "招陪", "公保"],
    "天庾": ["甘责", "侍坐", "传授", "学相术", "学九流", "相回", "算命", "送行", "遣行", "戒行", "退悔", "开递", "遣归", "招饮", "留饮", "请教", "接招", "间行", "狂歌", "高谈", "叫喊", "发怒", "狂言", "勤耕", "默坐静想", "远望", "侍立", "涕泗", "修史", "看史", "看书", "看小说", "看杂书", "抄书"],
    "天仓": ["三十七", "钉书", "裱禙", "鼾睡", "枉顾", "失约", "写错", "佯醉", "佯狂", "三十八", "诈痴", "求文", "卯纸", "染布", "染物", "疯癫", "暗笑", "私窃", "三十九", "投机", "流言", "飞语", "赎罪", "赎身", "买命", "励行", "报恩", "五十八", "报冤", "报信", "报喜", "养病", "酒溺", "解纷"],
    "天囷": ["四十一", "四十六", "四十三", "锄强", "扶弱", "谈玄", "论空", "起衅", "弥怨", "四十二", "构祸", "五十九", "遗祸", "处公", "骇象", "死谏", "偷盗", "寄书信", "扳害", "打听", "买货", "连累", "贪酷", "清正", "激发", "刁唆", "掩藏", "把持", "提纲", "分发", "阿媚", "催促", "籹点", "造作"],
    "天廪": ["四十七", "六八", "四十九", "五八", "五十", "悖逆", "风流", "奢侈", "公平", "明良", "娉婷", "贞洁", "正直", "慷慨", "豪侠", "妥帖", "鄙陋", "贤淑", "清秀", "孝友", "仁慈", "诡诈", "富足", "贫士", "愚钝", "骄傲", "鲁莽", "颠倒", "犹豫", "支离", "清", "丑媸", "错过", "仓促"],
    "天厩": ["瞽目", "憔悴", "开店", "设典", "量米", "粜贴", "籴贩", "钱庄", "眇目", "聋耳", "疯痼", "折手", "跛足", "驼背", "肥胖", "黑瘦", "粉白", "梳头", "着衣", "脱脚", "圆形", "削发", "斩指", "洗脸", "濯足", "沐浴", "叩首", "掩鼻", "吐唾", "临厕", "屈膝", "割股", "赤脚", "着脚"],
    "天罇": ["打骂", "七十一", "七二", "七三", "息肩", "七四", "七五", "曲肱", "昧心", "挥汗", "加冠", "束带", "解带", "解绶", "结彩", "衣葛", "致币", "浣衣", "洗手", "贸易", "绩麻", "织布", "裁剪", "掮木", "荷负", "拥被", "缠足", "运粮", "解宪", "申宪", "进京", "出京", "炊饭", "六十九"],
    "天鸡": ["五十一", "五十七", "做酒", "六十四", "六十八", "烧饼", "七十", "六十七", "宰杀", "烹庖", "五十八", "六十五", "煮粥", "烧火", "淘米", "作糖", "六十六", "合药", "五十二", "脱贫", "兴贩", "做花爆", "放花爆", "行贿", "得贿", "通事", "谋为", "沽酒", "五十九", "做面", "造纸", "造笔", "造砚", "进香"],
    "天园": ["五十三", "六十二", "毒鸩", "吃苦", "夹快", "谦恭", "老迈", "和睦", "死谏", "六九", "六十一", "升科", "未科", "通状", "七六", "七七", "七八", "掘藏", "五十五", "六十二", "挖沟", "七九", "九九", "八十", "拾物", "拾金", "讨债", "五十六", "六十", "放债", "典当", "完课", "刺杀", "得宝"],
    "天溷": ["挑盒", "投军", "九十", "八五", "八三", "八八", "八九", "九五", "九八", "九十九", "八十四", "一百", "八六七", "九一二三", "九四六七", "相骂", "乱嚷", "告䜣", "请会", "做戏", "看戏", "领亲眷", "捉虱", "互换", "抵当", "相打", "千数", "万数", "迎神会", "塑像", "空空", "吟吟", "歌舞", "作乐"]
}; 

// 全局变量
let lastCheckedTime = new Date();  // 上次检查时间

// 初始化下拉框
function initDropdowns() {
    console.log("初始化下拉框...");
    
    try {
        // 填充下拉框
        fillSelect('tianpan');
        fillSelect('dipan');
        
        // 检查下拉框是否正确填充
        const tianpanSelect = document.getElementById('tianpan');
        const dipanSelect = document.getElementById('dipan');
        
        if (tianpanSelect && dipanSelect) {
            console.log(`下拉框初始值: 天盘=${tianpanSelect.value}, 地盘=${dipanSelect.value}`);
        } else {
            console.error("未找到下拉框元素");
        }
    } catch (error) {
        console.error("初始化下拉框时出错:", error);
    }
}