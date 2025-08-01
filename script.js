const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

// 每个地支的时间分段数量
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
    "亥-1": "天籥", "亥-2": "天井"
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
    return liuheMap[ke] || null;
}

// 从天干地支组合中提取地支
function extractDizhi(ganzhiString) {
    // 如果输入不是有效字符串，则原样返回
    if (!ganzhiString || typeof ganzhiString !== 'string') {
        return ganzhiString;
    }
    
    // 直接返回最后一个字符
    return ganzhiString.charAt(ganzhiString.length - 1);
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
        
        // 从天盘中提取地支部分
        const selectedTianpanDizhi = extractDizhi(selectedTianpan);
        
        // 计算选择天盘的六合地支
        const liuHeDizhi = liuheMap[selectedTianpanDizhi];
        if (!liuHeDizhi) {
            console.error(`找不到地支${selectedTianpanDizhi}的六合关系`);
            return null;
        }
        
        console.log(`初始天盘${selectedTianpan}(地支=${selectedTianpanDizhi})的六合地支是${liuHeDizhi}`);
        
        // 构建从地盘到天盘的映射
        const tianpanMap = {};
        
        // 遍历表格单元格，构建映射
        dipanOrder.forEach((pos) => {
            const dipanName = pos.name;
            const cellElement = document.getElementById(`fill-${pos.row}-${pos.col}`);
            
            if (cellElement && cellElement.textContent) {
                const tianpanValue = cellElement.textContent;
                tianpanMap[dipanName] = tianpanValue; // 地盘 -> 天盘
                console.log(`地盘${dipanName} -> 天盘${tianpanValue}`);
            }
        });
        
        // 机锋: 找到地盘为六合地支的宫位
        const jifengDipan = liuHeDizhi;  // 地盘就是六合地支
        const jifengTianpan = tianpanMap[jifengDipan] || "无"; // 查找该地盘对应的天盘
        
        console.log(`机锋门: 找到地盘为${liuHeDizhi}的宫位，天盘=${jifengTianpan}`);
        
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
    console.log(`开始计算地支${dizhi}的星司...`);
    
    if (!dizhi || dizhi === "无") {
        console.log(`地支为空或"无"，无法获取星司`);
        return null;
    }
    
    try {
        // 提取地支部分（如果包含天干）
        const dizhiPart = extractDizhi(dizhi);
        console.log(`提取地支部分: ${dizhi} -> ${dizhiPart}`);
        
        // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        console.log(`使用当前时间 ${hour}:${minute} 计算地支${dizhiPart}的星司`);
        
        // 计算地支所在的部分
        const part = getBranchPartByTime(dizhiPart, hour, minute);
        console.log(`地支${dizhiPart}在当前时间的部分计算结果: 第${part}份`);
        
        // 获取对应的星司名称
        const key = `${dizhiPart}-${part}`;
        console.log(`尝试获取星司，key=${key}`);
        
        const star = xingsiNames[key];
        
        if (!star) {
            console.error(`未找到地支${dizhiPart}第${part}份的星司名称，key=${key}`);
            console.log("可用的星司映射:");
            for (const k in xingsiNames) {
                if (k.startsWith(dizhiPart)) {
                    console.log(`- ${k}: ${xingsiNames[k]}`);
                }
            }
            return null;
        }
        
        console.log(`地支${dizhiPart}的第${part}份对应星司: ${star}`);
        
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
        const branchStarKey = `${currentBranch}-${branchPart}`;
        const branchStar = xingsiNames[branchStarKey];
        const branchStarNumber = xingsiNumberMap[branchStar];
        
        console.log(`时辰星司计算: ${currentBranch} 第${branchPart}份, key=${branchStarKey} -> ${branchStar || '未找到'}(${branchStarNumber || '?'})`);
        
        // 计算当前刻的星司
        // 由于刻只有一份，因此部分始终为1
        const keStarKey = `${currentKe}-1`;
        const keStar = xingsiNames[keStarKey];
        const keStarNumber = xingsiNumberMap[keStar];
        
        console.log(`刻星司计算: ${currentKe} 第1份, key=${keStarKey} -> ${keStar || '未找到'}(${keStarNumber || '?'})`);
        
        // 获取星司详情UI元素
        const branchStarElement = document.getElementById("shi-star");
        const keStarElement = document.getElementById("ke-star");
        
        // 检查UI元素
        console.log(`UI元素检查: branchStarElement=${!!branchStarElement}, keStarElement=${!!keStarElement}`);
        
        // 更新星司详情UI显示
        if (branchStarElement) {
            if (branchStar) {
                const starNumber = branchStarNumber ? ` (${branchStarNumber})` : '';
                branchStarElement.textContent = `${branchStar}${starNumber}`;
                console.log(`已更新时辰星司显示: ${branchStar}${starNumber}`);
            } else {
                console.error(`未找到时辰${currentBranch}第${branchPart}份的星司，key=${branchStarKey}`);
                branchStarElement.textContent = "未知星司";
            }
        } else {
            console.error("未找到时星司元素");
        }
        
        if (keStarElement) {
            if (keStar) {
                const starNumber = keStarNumber ? ` (${keStarNumber})` : '';
                keStarElement.textContent = `${keStar}${starNumber}`;
                console.log(`已更新刻星司显示: ${keStar}${starNumber}`);
            } else {
                console.error(`未找到刻${currentKe}的星司，key=${keStarKey}`);
                keStarElement.textContent = "未知星司";
            }
        } else {
            console.error("未找到刻星司元素");
        }
        
        // 根据当前刻自动设置天盘
        const tianpanSelect = document.getElementById('tianpan');
        if (tianpanSelect) {
            const currentTianPan = calculateTianPanFromKe(currentKe);
            tianpanSelect.value = currentTianPan;
            console.log(`根据当前刻 ${currentKe} 自动设置天盘为: ${currentTianPan}`);
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

// 按照时间计算地支在哪个分段
function getBranchPartByTime(branch, hour, minute) {
    if (!branch) {
        console.error("地支为空，无法计算分段");
        return 1; // 默认返回第一分段
    }
    
    // 提取地支部分（如果包含天干）
    const pureBranch = extractDizhi(branch);
    console.log(`提取地支部分(getBranchPartByTime): ${branch} -> ${pureBranch}`);
    
    try {
        console.log(`计算地支${pureBranch}在时间${hour}:${minute}的部分...`);
        
        // 获取总份数
        const totalParts = dizhiParts[pureBranch] || 1;
        console.log(`地支${pureBranch}共有${totalParts}份`);
        
        // 如果只有1份，直接返回
        if (totalParts === 1) {
            console.log(`地支${pureBranch}只有1份，直接返回第1份`);
            return 1;
        }
        
        // 将24小时转换为分钟
        const totalMinutesInDay = 24 * 60; // 1440分钟
        
        // 计算当前时间在一天中的分钟数
        const currentTimeInMinutes = hour * 60 + minute;
        console.log(`当前时间 ${hour}:${minute} 在一天中的分钟数: ${currentTimeInMinutes}`);
        
        // 计算每份的分钟数
        const minutesPerPart = totalMinutesInDay / totalParts;
        console.log(`24小时分为${totalParts}份，每份${minutesPerPart}分钟`);
        
        // 计算当前时间属于哪一份
        const currentPart = Math.floor(currentTimeInMinutes / minutesPerPart) + 1;
        
        // 确保返回值在有效范围内
        const finalPart = Math.min(Math.max(currentPart, 1), totalParts);
        
        // 计算当前份的时间范围
        const startMinutes = (finalPart - 1) * minutesPerPart;
        const endMinutes = finalPart * minutesPerPart;
        
        // 转换为小时:分钟格式
        const startHour = Math.floor(startMinutes / 60);
        const startMinute = Math.floor(startMinutes % 60);
        const endHour = Math.floor(endMinutes / 60);
        const endMinute = Math.floor(endMinutes % 60);
        
        const startTimeStr = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
        const endTimeStr = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
        
        console.log(`地支${pureBranch}在时间${hour}:${minute}属于第${finalPart}/${totalParts}份，时间范围: ${startTimeStr}-${endTimeStr}`);
        
        return finalPart;
    } catch (error) {
        console.error(`计算地支${branch}部分时出错:`, error);
        return 1;
    }
}

// 验证特定时间的星司计算
function verifySpecificTimes() {
    console.log("验证特定时间的星司计算...");
    
    try {
        // 验证子时的星司计算
        const testTimes = [
            { branch: "子", hour: 23, minute: 30 },
            { branch: "子", hour: 0, minute: 30 },
            { branch: "丑", hour: 1, minute: 30 },
            { branch: "寅", hour: 3, minute: 30 },
            { branch: "卯", hour: 5, minute: 30 },
            { branch: "辰", hour: 7, minute: 30 },
            { branch: "巳", hour: 9, minute: 30 },
            { branch: "午", hour: 11, minute: 30 },
            { branch: "未", hour: 13, minute: 30 },
            { branch: "申", hour: 15, minute: 30 },
            { branch: "酉", hour: 17, minute: 30 },
            { branch: "戌", hour: 19, minute: 30 },
            { branch: "亥", hour: 21, minute: 30 }
        ];
        
        testTimes.forEach(({ branch, hour, minute }) => {
            const part = getBranchPartByTime(branch, hour, minute);
            const starKey = `${branch}-${part}`;
            const star = xingsiNames[starKey];
            console.log(`${branch}时 ${hour}:${minute.toString().padStart(2, '0')} -> 第${part}份 -> ${star || '未知'}`);
        });
        
        // 验证当前时辰的星司计算
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentBranch = getCurrentTimeBranch();
        const currentPart = getBranchPartByTime(currentBranch, currentHour, currentMinute);
        const currentStarKey = `${currentBranch}-${currentPart}`;
        const currentStar = xingsiNames[currentStarKey];
        
        console.log(`当前时间: ${currentHour}:${currentMinute.toString().padStart(2, '0')}`);
        console.log(`当前时辰: ${currentBranch}, 第${currentPart}份 -> ${currentStar || '未知'}`);
        
        // 验证每个地支的第一份星司
        console.log("\n每个地支的星司划分:");
        dizhi.forEach(branch => {
            const parts = dizhiParts[branch] || 1;
            console.log(`${branch}时(${parts}份):`);
            if (parts === 1) {
                const starKey = `${branch}-1`;
                console.log(`${branch}时(1份): ${starKey} -> ${xingsiNames[starKey] || '未知'}`);
            } else {
                // 计算每份的时间范围
                const branchHourMap = {
                    "子": 23, // 特殊情况，跨天
                    "丑": 1, "寅": 3, "卯": 5, "辰": 7, "巳": 9, 
                    "午": 11, "未": 13, "申": 15, "酉": 17, "戌": 19, "亥": 21
                };
                
                const startHour = branchHourMap[branch];
                const totalMinutes = 120; // 每个时辰2小时
                const minutesPerPart = Math.floor(totalMinutes / parts);
                
                for (let i = 1; i <= parts; i++) {
                    const startMinute = (i - 1) * minutesPerPart;
                    const endMinute = i * minutesPerPart - 1;
                    
                    let startTimeH = startHour + Math.floor(startMinute / 60);
                    let startTimeM = startMinute % 60;
                    let endTimeH = startHour + Math.floor(endMinute / 60);
                    let endTimeM = endMinute % 60;
                    
                    // 处理子时跨天的特殊情况
                    if (branch === "子") {
                        if (startTimeH >= 24) startTimeH -= 24;
                        if (endTimeH >= 24) endTimeH -= 24;
                    }
                    
                    const formatTime = (h, m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                    const timeRange = `${formatTime(startTimeH, startTimeM)}-${formatTime(endTimeH, endTimeM)}`;
                    const starKey = `${branch}-${i}`;
                    console.log(`  第${i}份: ${timeRange} -> ${starKey} -> ${xingsiNames[starKey] || '未知'}`);
                }
            }
        });
        
        console.log("验证完成");
    } catch (error) {
        console.error("验证特定时间的星司计算时出错:", error);
    }
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
        
        // 获取当前四柱信息
        const currentTime = LunarUtil.getCurrentTime();
        const dayGan = currentTime.dayGan;
        const dayZhi = currentTime.dayZhi;
        const dayGanZhi = currentTime.dayGanZhi;
        const timeGan = currentTime.timeGan;
        const timeZhi = currentTime.timeZhi;
        const timeGanZhi = currentTime.timeGanZhi;
        
        // 根据当前刻计算天盘
        const currentTianPan = calculateTianPanFromKe(currentKe);
        
        console.log(`当前时间: ${hour}:${minute.toString().padStart(2, '0')}`);
        console.log(`当前日干支: ${dayGanZhi}, 当前时干支: ${timeGanZhi}, 当前刻: ${currentKe}`);
        console.log(`根据刻计算的天盘: ${currentTianPan}`);
        
        // 更新下拉框选择（但不触发表格更新）
        const tianpanSelect = document.getElementById('tianpan');
        const dipanSelect = document.getElementById('dipan');
        
        // 检查元素是否存在
        if (tianpanSelect) {
            // 确认当前刻选项存在
            let keOptionExists = false;
            for (let i = 0; i < tianpanSelect.options.length; i++) {
                if (tianpanSelect.options[i].value === currentTianPan) {
                    keOptionExists = true;
                    break;
                }
            }
            
            if (keOptionExists) {
                tianpanSelect.value = currentTianPan; // 天盘根据当前刻设置
                console.log(`设置天盘下拉框值为当前刻: ${currentTianPan}`);
            } else {
                console.warn(`天盘下拉框中没有当前刻选项: ${currentTianPan}`);
            }
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
        const currentGanElement = document.getElementById('current-gan');
        const currentDayGanZhiElement = document.getElementById('current-day-ganzhi');
        
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
        
        if (currentGanElement) {
            currentGanElement.textContent = timeGan + timeZhi + "时";
        } else {
            console.error("未找到current-gan元素");
        }
        
        if (currentDayGanZhiElement) {
            currentDayGanZhiElement.textContent = dayGanZhi + "日";
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
                // 使用完整的天盘值
                const tianpanText = jifengMen.tianpan;
                // 提取地支部分（如果包含天干）
                const tianpanDizhi = extractDizhi(tianpanText);
                
                jifengTianpanElement.textContent = tianpanText;
                jifengDipanElement.textContent = jifengMen.dipan;
                
                // 更新结果显示
                if (jifengResultElement) {
                    jifengResultElement.textContent = `${tianpanText}+${jifengMen.dipan}`;
                }
                
                // 显示机锋门卡片
                const jifengCard = document.getElementById('jifeng-card');
                if (jifengCard) {
                    jifengCard.style.display = 'block';
                }
                
                // 更新星司机锋门信息
                updateXingsiJifengMen(jifengMen);
                
                console.log(`机锋门更新为: 天盘=${tianpanText}, 地盘=${jifengMen.dipan}`);
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
        
        // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        console.log(`使用当前时间 ${hour}:${minute} 计算机锋门星司`);
        
        // 获取天盘星司
        let tianpanStar = null;
        let tianpanStarNumber = null;
        
                    if (jifengMen.tianpan && jifengMen.tianpan !== "无") {
                // 提取地支部分（如果包含天干）
                const tianpanDizhi = extractDizhi(jifengMen.tianpan);
                console.log(`从机锋门天盘${jifengMen.tianpan}提取地支：${tianpanDizhi}`);
                
                // 获取天盘地支对应的分段
                const tianpanPart = getBranchPartByTime(tianpanDizhi, hour, minute);
            const tianpanKey = `${tianpanDizhi}-${tianpanPart}`;
            tianpanStar = xingsiNames[tianpanKey];
            
            console.log(`机锋门天盘${jifengMen.tianpan}(地支为${tianpanDizhi})的分段计算: 第${tianpanPart}份, key=${tianpanKey}`);
            
            if (tianpanStar) {
                tianpanStarNumber = xingsiNumberMap[tianpanStar];
                console.log(`天盘星司: ${tianpanDizhi} 第${tianpanPart}份 -> ${tianpanStar}(${tianpanStarNumber})`);
            } else {
                console.error(`未找到天盘${tianpanDizhi}第${tianpanPart}份的星司名称，key=${tianpanKey}`);
                console.log("可用的星司映射:");
                Object.keys(xingsiNames).forEach(key => {
                    if (key.startsWith(tianpanDizhi)) {
                        console.log(`- ${key}: ${xingsiNames[key]}`);
                    }
                });
            }
        }
        
        // 获取地盘星司
        // 计算地盘地支对应的分段
        const dipanPart = getBranchPartByTime(jifengMen.dipan, hour, minute);
        const dipanKey = `${jifengMen.dipan}-${dipanPart}`;
        const dipanStar = xingsiNames[dipanKey];
        
        console.log(`机锋门地盘${jifengMen.dipan}的分段计算: 第${dipanPart}份, key=${dipanKey}`);
        
        if (!dipanStar) {
            console.error(`未找到地盘${jifengMen.dipan}第${dipanPart}份的星司名称，key=${dipanKey}`);
            console.log("可用的星司映射:");
            Object.keys(xingsiNames).forEach(key => {
                if (key.startsWith(jifengMen.dipan)) {
                    console.log(`- ${key}: ${xingsiNames[key]}`);
                }
            });
            xingsiResultElement.textContent = "无法计算";
            xingsiResultNumbersElement.textContent = "无法计算";
            return;
        }
        
        const dipanStarNumber = xingsiNumberMap[dipanStar];
        console.log(`地盘星司: ${jifengMen.dipan} 第${dipanPart}份 -> ${dipanStar}(${dipanStarNumber})`);
        
        // 更新星司结果显示
        if (tianpanStar) {
            xingsiResultElement.textContent = `${tianpanStar} + ${dipanStar}`;
            xingsiResultNumbersElement.textContent = `${tianpanStarNumber || "?"} + ${dipanStarNumber || "?"}`;
            console.log(`更新星司机锋门结果: ${tianpanStar} + ${dipanStar}`);
        } else {
            xingsiResultElement.textContent = dipanStar;
            xingsiResultNumbersElement.textContent = dipanStarNumber || "?";
            console.log(`更新星司机锋门结果(仅地盘): ${dipanStar}`);
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

// 计算推字
function calculateTuizi() {
    console.log("开始计算推字");
    
    try {
        // 获取机锋门
        const jifengResult = calculateJifengMen();
        if (!jifengResult) {
            console.error("无法计算机锋门，无法推字");
            return null;
        }
        
        // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        console.log(`使用当前时间 ${hour}:${minute} 计算推字`);
        
        // 获取机锋门天地盘
        let tianpan = jifengResult.tianpan;
        const dizhi = jifengResult.dipan;
        
        // 提取地支部分（如果包含天干）
        const tianpanDizhi = extractDizhi(tianpan);
        
        console.log(`机锋门天地盘: 天盘=${tianpan}(地支为${tianpanDizhi}), 地盘=${dizhi}`);
        
        // 如果天盘为"无"，无法计算推字
        if (tianpan === "无") {
            console.warn("天盘为'无'，无法计算完整推字");
            // 仍然返回地盘星司信息
            const dizhiPart = getBranchPartByTime(dizhi, hour, minute);
            console.log(`地盘${dizhi}分段计算: 第${dizhiPart}份`);
            const dizhiXingsiName = xingsiNames[`${dizhi}-${dizhiPart}`];
            console.log(`地盘星司: ${dizhi} 第${dizhiPart}份 -> ${dizhiXingsiName || '未找到'}`);
            
            return {
                tianpanXingsi: null,
                tianpanNumber: null,
                dizhiXingsi: dizhiXingsiName,
                dizhiNumber: dizhiXingsiName ? xingsiNumberMap[dizhiXingsiName] : null,
                tuiziIndex: null,
                tuiziList: []
            };
        }
        
        // 计算天盘星司
        const tianpanPart = getBranchPartByTime(tianpanDizhi, hour, minute);
        console.log(`天盘${tianpanDizhi}分段计算: 第${tianpanPart}份`);
        const tianpanXingsiName = xingsiNames[`${tianpanDizhi}-${tianpanPart}`];
        if (!tianpanXingsiName) {
            console.error(`未找到天盘${tianpanDizhi}第${tianpanPart}份的星司名称`);
            console.log("可用的星司映射:");
            Object.keys(xingsiNames).forEach(key => {
                if (key.startsWith(tianpanDizhi)) {
                    console.log(`- ${key}: ${xingsiNames[key]}`);
                }
            });
            return null;
        }
        const tianpanNumber = xingsiNumberMap[tianpanXingsiName];
        console.log(`天盘星司: ${tianpanDizhi} 第${tianpanPart}份 -> ${tianpanXingsiName}(${tianpanNumber || '?'})`);
        
        // 计算地盘星司
        const dizhiPart = getBranchPartByTime(dizhi, hour, minute);
        console.log(`地盘${dizhi}分段计算: 第${dizhiPart}份`);
        const dizhiXingsiName = xingsiNames[`${dizhi}-${dizhiPart}`];
        if (!dizhiXingsiName) {
            console.error(`未找到地盘${dizhi}第${dizhiPart}份的星司名称`);
            console.log("可用的星司映射:");
            Object.keys(xingsiNames).forEach(key => {
                if (key.startsWith(dizhi)) {
                    console.log(`- ${key}: ${xingsiNames[key]}`);
                }
            });
            return null;
        }
        const dizhiNumber = xingsiNumberMap[dizhiXingsiName];
        console.log(`地盘星司: ${dizhi} 第${dizhiPart}份 -> ${dizhiXingsiName}(${dizhiNumber || '?'})`);
        
        // 获取天盘星司对应的推字列表
        const tuiziList = xingsiTuiziMap[tianpanXingsiName] || [];
        if (tuiziList.length === 0) {
            console.error(`未找到天盘星司 ${tianpanXingsiName} 对应的推字列表`);
            return null;
        }
        
        // 确保地盘星司数字有效
        if (!dizhiNumber) {
            console.error(`未找到地盘星司${dizhiXingsiName}对应的数字`);
            return null;
        }
        
        console.log(`推字计算: 天盘=${tianpan}(星司=${tianpanXingsiName}, 数字=${tianpanNumber}), 地盘=${dizhi}(星司=${dizhiXingsiName}, 数字=${dizhiNumber})`);
        
        // 根据他占/自占确定推字方向
        const isTaZhan = document.getElementById('taZhan').checked;
        let tuiziIndex;
        
        if (isTaZhan) {
            // 他占顺数
            tuiziIndex = (parseInt(dizhiNumber) - 1) % tuiziList.length;
            console.log(`他占顺数: 地盘星司数${dizhiNumber} -> 在天盘星司(${tianpanXingsiName})推字列表中索引 ${tuiziIndex}`);
        } else {
            // 自占逆数
            const num = parseInt(dizhiNumber);
            tuiziIndex = (tuiziList.length - (num % tuiziList.length)) % tuiziList.length;
            if (num % tuiziList.length === 0) {
                tuiziIndex = 0;
            }
            console.log(`自占逆数: 地盘星司数${dizhiNumber} -> 在天盘星司(${tianpanXingsiName})推字列表中索引 ${tuiziIndex}`);
        }
        
        // 返回推字结果
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
    console.log("更新推字信息");
    
    try {
        // 计算推字
        const tuiziResult = calculateTuizi();
        if (!tuiziResult) {
            console.error("无法计算推字");
            return;
        }
        
        // 获取推字结果元素
        const resultElement = document.getElementById('tuizi-result');
        const explainElement = document.getElementById('tuizi-explain');
        
        if (!resultElement || !explainElement) {
            console.error("未找到推字结果元素");
            return;
        }
        
        // 更新推字结果
        if (tuiziResult.tuiziList && tuiziResult.tuiziIndex !== undefined) {
            resultElement.textContent = tuiziResult.tuiziList[tuiziResult.tuiziIndex] || "无法推字";
            
            // 更新推字解释
            explainElement.textContent = `${tuiziResult.tianpanStar}(${tuiziResult.tianpanStarNumber}) + ${tuiziResult.dipanStar}(${tuiziResult.dipanStarNumber})，${tuiziResult.zhanType}推字`;
        } else {
            resultElement.textContent = "无法推字";
            explainElement.textContent = "无法计算推字信息";
        }
        
        // 显示推字卡片
        const tuiziCard = document.getElementById('tuizi-card');
        if (tuiziCard) {
            tuiziCard.style.display = 'block';
        }
        
        console.log("推字信息更新完成");
    } catch (error) {
        console.error("更新推字信息时出错:", error);
    }
}

// 页面加载完成后的初始化
document.addEventListener("DOMContentLoaded", function() {
    console.log("页面加载完成，初始化...");
    
    // 初始化地支下拉框
    initDizhiDropdowns();
    
    // 初始化星司数据
    initXingsiData();
    
    // 更新当前时间显示
    updateTimeDisplay();
    
    // 设置定时器，每分钟检查一次时间变化
    setInterval(function() {
        const now = new Date();
        const minute = now.getMinutes();
        
        // 如果分钟变化了，更新时间显示
        if (lastMinute !== minute) {
            updateTimeDisplay();
            lastMinute = minute;
        }
    }, 10000); // 每10秒检查一次
    
    // 排盘按钮点击事件
    const paipanBtn = document.getElementById("paipan-btn");
    if (paipanBtn) {
        paipanBtn.addEventListener("click", function() {
            // 显示天盘地盘表格
            const tianpanTable = document.getElementById("tianpan-table");
            if (tianpanTable) {
                tianpanTable.style.display = "block";
            }
            
            // 显示用神选择区域
            const yongshenSection = document.getElementById("yongshen-section");
            if (yongshenSection) {
                yongshenSection.style.display = "block";
            }
            
            // 更新表格和相关信息
            updateTable();
        });
    }
    
    // 刷新时间按钮点击事件
    const refreshBtn = document.getElementById("refresh-btn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", function() {
            updateTimeDisplay();
        });
    }
    
    // 测试星司计算按钮点击事件
    const testXingsiBtn = document.getElementById("test-xingsi-btn");
    if (testXingsiBtn) {
        testXingsiBtn.addEventListener("click", testAllBranchParts);
    }
    
    // 用神计算按钮事件
    const yongshenBtn = document.getElementById("yongshen-btn");
    if (yongshenBtn) {
        yongshenBtn.addEventListener("click", calculateYongShen);
    }
    
    console.log("初始化完成");
});

// 初始化星司数据
function initXingsiData() {
    console.log("初始化星司数据...");
    
    try {
        // 硬编码星司名称映射，确保数据正确
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
        
        // 硬编码星司数字映射，确保数据正确
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
        
        // 验证几个关键映射
        console.log(`验证星司映射: 子-1 -> ${xingsiNames["子-1"] || "未找到"}`);
        console.log(`验证星司数字: 天渊 -> ${xingsiNumberMap["天渊"] || "未找到"}`);
        console.log(`验证星司映射: 未-2 -> ${xingsiNames["未-2"] || "未找到"}`);
        console.log(`验证星司数字: 天稷 -> ${xingsiNumberMap["天稷"] || "未找到"}`);
        
        // 输出所有星司映射，便于调试
        console.log("所有星司映射:");
        Object.keys(xingsiNames).sort().forEach(key => {
            console.log(`${key}: ${xingsiNames[key]}`);
        });
        
        console.log("星司数据初始化完成");
    } catch (error) {
        console.error("初始化星司数据时出错:", error);
    }
}

// 地盘位置定义
const dipanOrder = [
    { row: 1, col: 1, name: '巳' },
    { row: 1, col: 2, name: '午' },
    { row: 1, col: 3, name: '未' },
    { row: 1, col: 4, name: '申' },
    { row: 2, col: 1, name: '辰' },
    { row: 2, col: 4, name: '酉' },
    { row: 3, col: 1, name: '卯' },
    { row: 3, col: 4, name: '戌' },
    { row: 4, col: 1, name: '寅' },
    { row: 4, col: 2, name: '丑' },
    { row: 4, col: 3, name: '子' },
    { row: 4, col: 4, name: '亥' }
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
            // updateJifengMen();
            // updateXingsiInfo();
            // 移除自动调用updateTuiziInfo
            // updateTuiziInfo();
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

        // 获取当前四柱信息
        const currentTime = LunarUtil.getCurrentTime();
        const shiGan = currentTime.timeGan;
        console.log(`当前时干: ${shiGan} (从农历库获取)`);
        
        // 填入天盘内容
        dipanOrder.forEach((pos) => {
            const dipanName = pos.name;
            const dipanIndex = dizhi.indexOf(dipanName);
            
            if (dipanIndex >= 0) {  // 确保地盘有效
                // 获取该地盘位置应填入的天盘值
                const fillTianpanValue = fillValueMap[dipanIndex];
                
                // 计算天干 - 根据时干五子元遁
                const tianGan = getWuziYuandun(shiGan, fillTianpanValue);
                
                // 填入单元格 - 显示天干地支
                const cellElement = document.getElementById(`fill-${pos.row}-${pos.col}`);
                if (cellElement) {
                    cellElement.textContent = tianGan + fillTianpanValue;
                } else {
                    console.warn(`未找到单元格元素: fill-${pos.row}-${pos.col}`);
                }
                
                console.log(`填充: 地盘${dipanName}(索引${dipanIndex}) -> 天盘${tianGan}${fillTianpanValue}`);
            }
        });
        
        console.log("表格更新完成");
        
        // 更新机锋门信息
        console.log("开始更新机锋门信息...");
        // updateJifengMen();
        
        // 更新星司信息
        console.log("开始更新星司信息...");
        // updateXingsiInfo();
        
        // 更新固定卡片信息
        console.log("开始更新固定卡片信息...");
        updateFixedCards();
        
        console.log("全部更新完成");
    } catch (error) {
        console.error("更新表格时出错:", error);
    }
}

// 星司推字映射
const xingsiTuiziMap = {
    "天厨": ["占天", "观云", "占云", "望云", "郊天", "呼风", "乘风", "占风", "藏水", "占星", "发水", "步月", "赏月", "占月", "曝日", "避日", "吟咏", "冒雪", "踏雪", "玩赏", "冒雨", "雨阻", "祷雨", "冒风", "卜雨", "冒雾", "占雾", "望风", "伐水", "望虹电", "占日色", "祷斗", "救火"],
    "天垒": ["烹雪", "祈晴", "占象", "禳火", "察变", "占纬", "惊雷", "惊霜", "畏日", "怨天", "怕风", "伤雨", "觇电", "伤雹", "占烟霞", "望气", "占河汉", "上疏", "请旨", "草诏", "济世", "闻风声", "唤雨", "役鬼神", "登山", "疏河道", "游名山", "游江湖", "观流泉", "凿池", "投江湖", "投河", "投井", "耕田"],
    "天渊": ["囊沙", "出行", "立国", "罢市", "就封", "争城", "咒水", "扫地", "叛国", "入山", "攻城", "扫墓", "罢市", "刻石", "开市", "设镇", "凿井", "泛海", "入山", "叛国", "游水", "文身", "刻石", "安邦", "刻木", "入境", "归家", "问津", "扼险", "渡江", "登基", "安邦", "立国", "铭碑", "渡济", "筑园", "铸铳", "割地", "涉水", "筑城"],
    "天桴": ["毁城", "迁城", "据城", "择邻", "望尘", "避乱", "逃难", "汲水", "饮水", "假道", "附国", "迁移", "渡关", "防胡", "申文", "请详", "解犯", "劈冤", "决囚", "伐国", "击敌", "战场", "操演", "试场", "防边", "防海", "防奸", "通番", "防江", "防港", "辞权", "专恣", "成功", "当权"],
    "天籥": ["争奇", "握令", "布法", "门巧", "失势", "犯禁", "纪功", "作成", "回驾", "乘势", "贺岁", "贺喜", "贺寿", "迎春", "迎喜", "寻春", "防秋", "防夜", "巡更", "趋时", "占年", "避暑", "守岁", "贺节", "赛社", "待漏", "护月", "护日", "占气", "占时", "玩景", "告朔", "御冬", "置烽"],
    "天井": ["造历", "颁历", "祈社", "忧时", "欢世", "赌博", "猜迷", "安葬", "造坟", "炼药", "炼丹", "春耕", "秋荐", "夜读", "早起", "夜行", "书寝", "晓行", "夜渔", "春试", "秋试", "秋敛", "春荐", "冬狩", "昏定", "秋省", "晨省", "时祭", "夙念", "病疾", "怨恨", "思忆", "愁寒", "乘凉"],
    "天江": ["望财", "忧旱", "踏青", "一数", "释奠", "祀先", "驱祟", "秋迁", "春迁", "山居", "二数", "水战", "驿宿", "飞递", "野合", "乡饮", "饥寒", "避暑", "贫苦", "乞丐", "饱暖", "呼童", "求贤", "求官", "求名", "称臣", "面望", "安民", "屯兵", "引兵", "求仙", "邀赏", "三数", "重三"],
    "天辐": ["重二", "重一", "延师", "从军", "访友", "盟誓", "求签", "问笤", "算命", "行医", "求医", "服药", "烧祟", "卖卜", "择友", "取仕", "出任", "拜将", "代父", "教子", "亲病", "告病", "告老", "致仕", "出戍", "拜相", "交友", "约交", "辅孤", "托孤", "见贤", "纳客", "纳贤", "四数"],
    "天门": ["益兵", "大败", "进兵", "谪贬", "犒赏", "寻亲", "寻兄", "寻友", "买仆", "买婢仆", "买婢", "重四", "寻弟子", "寻幼婢", "寻亲戚", "娶妻", "纳妾", "生子", "娶媳", "婚聘", "结姻", "生孙", "逐婢奸", "弹奸", "攻盗", "捉贼", "出首", "作吏", "词讼", "私息", "为僧", "为道", "官差", "合伙"],
    "天田": ["投书", "交易", "托人", "栽种", "寻逃", "观海", "尽难", "自刎", "自缢", "烹茶", "看花", "赏花", "吟咏", "祭旗", "招兵", "积粮", "积草", "买马", "置甲", "蒸梨", "蒸饭", "烹葵", "烹菜", "作韲", "种兰蕙", "植树木", "种菊", "食果", "纳票", "征粮", "刈麦", "种麦", "请俸", "纳课"],
    "天枪": ["罚俸", "采药", "伐木", "赏玩", "采桑", "结茅", "负薪", "樵柴", "钟蔬", "采茶", "揲著", "捆履", "织席", "织布", "折花", "眠草", "插秧", "扳柳", "刈稻", "炊麦", "煮饭", "戽水", "耘草", "下种", "灌田", "编蒲", "卖花", "杖藜", "收谷", "芟荆", "编籬", "获奸", "造弓", "造箭"],
    "天庙": ["掩扉", "婚姻", "阴私", "窃盗", "烹炰", "骑驴", "牵羊", "骑马", "骑骡", "囊萤", "观凫", "蛙井", "遇虎", "遇狼", "遇熊", "犬咬", "画虎", "射虎", "奠雁", "逐鹿", "策马", "饲马", "射兽", "射禽", "虎伤", "石伤", "砲伤", "箭伤", "刀枪伤", "放鹤", "救蚁", "画龙", "写书", "钓鱼"],
    "天稷": ["牧羊", "五数", "重五", "割鸡", "斩蛇", "斗鸡", "牧牛", "捕蝗", "听蝉", "扑萤", "狎鸥", "饲蚕", "放鹰", "猎禽", "走狗", "遗物", "买鱼", "提鹅", "提笼", "提禽", "罗雀", "批鳞", "挥毫", "焚膏", "插血", "剪综", "筑岸", "观燕", "食鱼", "献难", "扑螺", "牵豚", "画马", "饮马"],
    "天相": ["筑坝", "筑塘", "牵磨", "耕田", "登楼", "登台", "开门", "闭门", "鼓门", "凭栏", "掀窗", "临轩", "关窗", "开仓", "建阁", "入阁", "逾城", "修城", "修墙", "筑墙", "逾墙", "修桥", "临桥", "上殿", "下殿", "辟户", "凿牖", "起屋", "为工", "学匠", "凿壁", "挖洞", "造桥", "开门"],
    "天社": ["立庙", "治郡", "治邑", "作令", "置地", "置田地", "复国", "灭国", "背国", "下狱", "六数", "重六", "七数", "重七", "决狱", "出狱", "越牢", "祀灶", "作灶", "筑垒", "掘塜", "造塔", "上楼", "下楼", "卧楼", "立祠", "结庐", "过房", "承继", "立嗣", "争屋", "创亭", "登仓廪", "赈救"],
    "天纪": ["筑城", "破城", "守城", "入手", "排闼", "焚烧", "劫掠", "丈量", "权衡", "开馆", "锁户", "锁厨厢", "扬鞭", "开帘", "垂帘", "弹琴", "弹筝", "吹笙", "吹箫", "鸣钟", "吹竽", "造船", "撑船", "执篙", "登舟", "张帆", "掀蓬", "收帆", "扎篙", "告状", "奔宪", "御状", "通状", "垂纶"],
    "天狼": ["缗婚", "持杆", "乘桴", "穿针", "敲针", "携樽", "磨针", "八数", "衔杯", "提壶", "投壶", "双陆", "开牌", "持瓶", "敲基", "重八", "乘车", "掷骰", "持筇", "荷锄", "张弓", "携灯", "挑灯", "燃灯", "重九", "重十", "衔枚", "移文", "咨文", "拈阄", "挥戈", "剔旌", "埋锅", "九数"],
    "天关": ["三七", "五五", "安营", "拔寨", "拔刀", "悬刀", "拔帜", "举帜", "设席", "买物", "磨刀", "卖器", "索取", "看书", "做文", "脩吏", "献策", "铸器械", "举棍", "击石", "垒石", "负笈", "奠枕", "持扇", "写扇", "磨墨", "画扇", "洗爵", "破釜", "涤斧", "运甓", "四七", "执器用", "遇贼棍"],
    "天街": ["五六", "秉笏", "放炮", "写字", "秉钺", "拥彗", "摄屐", "挂锡", "涤器", "数目三十一", "解报", "罚觥", "卖买", "买畜", "置器", "数筹", "借力", "借虎", "四八", "五七", "借气", "打牌", "打器", "摹帖", "荷氊", "捣帖", "拥犁", "三十三", "三十四", "踞床", "坐椅凳", "坐椅凳", "坐枱", "坐轿"],
    "天潢": ["六六", "锄泥", "踢球", "探囊", "飞剑", "开匣", "藏物", "移案", "传箭", "传檄", "推轱", "锁簟", "振铎", "磨刀", "撑伞", "掌扇", "雕字", "锁印", "开柜", "藏柜", "同榻", "同筵席", "各爨", "同舟", "同笔砚", "分席", "功名", "科第", "谋求", "文章", "勋劳", "才能", "事业", "藏器"],
    "天高": ["死葬", "冠笄", "斋戒", "受戒", "祭祀", "德望", "十数", "操刀", "抽签", "四六", "廿六", "登梯", "披蓑", "戴笠", "戴鏊", "摇铃", "添筹", "操戈", "廿二", "三九", "焚香", "进香", "祀佛", "拜忏", "念经", "念佛", "用刑", "廿三", "四七", "夹打", "修玄", "炼丹", "设账", "设榻"],
    "天谗": ["重十", "廿九", "收罾", "鸣笳", "关灯", "造铠", "铸剑", "舞剑", "佩剑", "淫嫖十三", "握笔", "洗砚", "骨牌", "裁纸", "挈盒", "举盏", "举著", "买笔砚", "抄写十三", "买纸", "写帖", "品笛", "鼓琴", "擂鼓", "鸣金", "击磬", "作乐", "赞造十九", "掌号", "收军", "退军", "买器", "收放缆", "结网"],
    "天苑": ["撒网", "设饵", "荷箦", "使棒", "整辔", "并驾", "照镜", "秉烛", "灭烛", "得印", "用印", "放火", "吃打", "打劫", "盗印", "铸印", "颁印", "允详", "剥勘", "打弹", "冒刃", "执戟", "揭榜", "看榜", "张谕", "合卺", "拔箭", "掺弩", "中箭", "发矢", "负耒耜", "歇肩", "挑担", "设椅"],
    "天阴": ["击缶", "披甲", "卸甲", "运斧", "伏钺", "伏节", "器械", "度量", "器概", "受爵", "品秩", "封诰", "赠谥", "法度", "智谋", "纪纲", "典型", "卖盗拔赃", "私盐诈陷", "范模", "流品", "韬略", "名誉", "忠直", "孝顺", "机变", "行伍", "生涯", "活计", "靠人", "僱工", "福分", "本分", "消息"],
    "天船": ["傲慢", "嬉笑", "戏谑", "嘲笑", "告假", "探吊", "进谒", "往聘", "往拜", "借物", "赴试", "应选", "过访", "梦惊", "梦魇", "隐居", "追求", "行寻", "坐视", "求荐", "求贷", "借器", "从仕", "醉倒", "趋进", "扶归", "召饮", "饥行", "赐宴", "召对", "聘问", "擢用", "招陪", "公保"],
    "天庾": ["甘责", "侍坐", "传授", "学相术", "学九流", "相面", "算命", "送行", "戒行", "退悔", "开递", "遣行二补", "遣归", "招饮", "留饭", "请教", "接招", "闻行", "狂歌", "高谈", "叫喊", "发怒", "狂言", "勤耕", "默坐静想", "远望", "侍立", "涕泗", "修史", "看史", "看书", "看小说", "看杂书", "抄书"],
    "天仓": ["三十七", "钉书", "裱禙", "鼾睡", "枉顾", "失约", "写错", "佯醉", "佯狂", "三十六", "诈痴", "求文", "卯纸", "染布", "染物", "疯癫", "暗笑", "私窃", "三十九", "投机", "流言", "飞语", "赎罪", "赎身", "买命", "励行", "报恩", "五十六", "报冤", "报信", "报喜", "养病", "救溺", "解纷"],
    "天囷": ["四十一", "四十六", "四十三", "锄强", "扶弱", "谈玄", "论空", "起衅", "弥怨", "四十二", "构祸", "五十九", "遗祸", "处公", "骇众", "死谏", "偷盗", "寄书信", "扳害", "打听", "置累", "连累", "贪酷", "清正", "激发", "刁唆", "掩藏", "把持", "提纲", "分发", "阿媚", "催促", "籹点", "造作"],
    "天廪": ["四十七", "六八", "四十九", "五八", "五十", "悖逆", "风流", "奢侈", "公平", "明良", "娉婷", "贞洁", "正直", "慷慨", "豪侠", "妥帖", "鄙陋", "贤淑", "清秀", "孝友", "仁慈", "诡诈", "富足", "贪下", "愚钝", "骄傲", "鲁莽", "颠倒", "犹豫", "支离", "清奇", "丑媸", "错过", "仓促"],
    "天厩": ["瞽目", "憔悴", "开店", "设典", "量米", "粜贩", "籴贩", "钱庄", "眇目", "聋耳", "疯痼", "折手", "跛足", "驼背", "肥胖", "黑瘦", "粉白", "梳头", "着衣", "脱脚", "圆形", "削发", "斩指", "洗脸", "濯足", "沐浴", "叩首", "掩鼻", "吐唾", "临厕", "屈膝", "割股", "赤脚", "着脚"],
    "天罇": ["打骂", "七十一", "七二", "七三", "息肩", "七四", "七五", "曲肱", "昧心", "挥汗", "加冠", "束带", "解带", "解绶", "结彩", "衣葛", "致币", "浣衣", "洗手", "贸布", "绩麻", "织布", "裁剪", "掮木", "荷负", "拥被", "缠足", "运粮", "解宪", "申宪", "进京", "出京", "炊饭", "六十九"],
    "天鸡": ["五十一", "五十七", "做酒", "六十四", "六十八", "烧饼", "七十", "六十七", "宰杀", "烹炮", "五十八", "六十五", "煮粥", "烧火", "淘米", "作糖", "六十六", "合药", "五十二", "脱贫", "兴贩", "做花爆", "放花爆", "行贿", "得贿", "通事", "谋为", "沽酒", "五十九", "做面", "造纸", "造笔", "造砚", "进香"],
    "天园": ["五十三", "六十二", "毒鸩", "吃苦", "夹快", "谦恭", "老迈", "和睦", "死谏", "六九", "六十一", "升科", "未科", "通状", "七六", "七七", "七八", "掘藏", "五十五", "六十二", "挖沟", "七九", "九九", "八十", "拾物", "拾金", "讨债", "五十六", "六十", "放债", "典当", "完课", "刺杀", "得宝"],
    "天溷": ["挑盒", "投军", "九十", "八五", "八三", "八八", "八九", "九五", "九八", "九十九", "八十四", "一百", "八六七", "九一二三", "九四六七", "相骂", "乱嚷", "告䜣", "请会", "做戏", "看戏", "领亲眷", "捉虱", "互换", "抵当", "相打", "千数", "万数", "迎神会", "塑像", "空空", "吟吟", "歌舞", "作乐"]
};


// 全局变量
let lastCheckedTime = null; // 上次检查时间
let lastMinute = -1; // 上次检查的分钟值

// 初始化地支下拉框
function initDizhiDropdowns() {
    console.log("初始化地支下拉框");
    
    try {
        const tianpanSelect = document.getElementById('tianpan');
        const dipanSelect = document.getElementById('dipan');
        
        if (!tianpanSelect || !dipanSelect) {
            console.error("未找到下拉框元素");
            return;
        }
        
        // 获取当前刻
        const currentKe = getCurrentKe();
        console.log(`当前刻: ${currentKe}`);
        
        // 清空现有选项
        tianpanSelect.innerHTML = '';
        dipanSelect.innerHTML = '<option value="" selected disabled>请选择地盘</option>';
        
        // 添加地支选项
        dizhi.forEach(branch => {
            // 添加天盘选项
            const tianpanOption = document.createElement('option');
            tianpanOption.value = branch;
            tianpanOption.textContent = branch;
            // 如果是当前刻，设为默认选中
            if (branch === currentKe) {
                tianpanOption.selected = true;
            }
            tianpanSelect.appendChild(tianpanOption);
            
            // 添加地盘选项
            const dipanOption = document.createElement('option');
            dipanOption.value = branch;
            dipanOption.textContent = branch;
            dipanSelect.appendChild(dipanOption);
        });
        
        console.log("地支下拉框初始化完成");
    } catch (error) {
        console.error("初始化地支下拉框时出错:", error);
    }
}

// 测试星司分段计算
function testXingsiPartCalculation() {
    console.log("===== 测试星司分段计算 =====");
    
    // 测试未时的分段计算
    const testUnweiFenCalculation = () => {
        const branch = "未";
        const totalParts = dizhiParts[branch] || 1;
        const totalMinutes = 120; // 2小时
        const partDuration = Math.floor(totalMinutes / totalParts);
        
        console.log(`测试"${branch}"时分段计算，共${totalParts}份，每份${partDuration}分钟`);
        
        // 计算每份的具体分钟范围
        for (let i = 1; i <= totalParts; i++) {
            const startMin = (i - 1) * partDuration;
            const endMin = i * partDuration - 1;
            console.log(`第${i}份范围: ${startMin}-${endMin}分钟`);
        }
        
        const testTimes = [
            { hour: 13, minute: 10, expected: 1 },  // 未时第1份
            { hour: 13, minute: 30, expected: 1 },  // 未时第1份
            { hour: 13, minute: 50, expected: 2 },  // 未时第2份
            { hour: 14, minute: 10, expected: 2 },  // 未时第2份
            { hour: 14, minute: 30, expected: 3 },  // 未时第3份
            { hour: 14, minute: 50, expected: 3 }   // 未时第3份
        ];
        
        testTimes.forEach(({ hour, minute, expected }) => {
            const part = getBranchPartByTime(branch, hour, minute);
            const starKey = `${branch}-${part}`;
            const star = xingsiNames[starKey];
            console.log(`时间 ${hour}:${minute.toString().padStart(2, '0')} -> 第${part}份 (期望:第${expected}份) -> ${star || '未知'}`);
        });
    };
    
    // 测试辰时的分段计算
    const testChenFenCalculation = () => {
        const branch = "辰";
        const totalParts = dizhiParts[branch] || 1;
        const totalMinutes = 120; // 2小时
        const partDuration = Math.floor(totalMinutes / totalParts);
        
        console.log(`\n测试"${branch}"时分段计算，共${totalParts}份，每份约${Math.floor(totalMinutes/totalParts)}分钟`);
        
        const testTimes = [
            { hour: 7, minute: 5, expected: 1 },    // 辰时第1份
            { hour: 7, minute: 20, expected: 2 },   // 辰时第2份
            { hour: 7, minute: 40, expected: 3 },   // 辰时第3份
            { hour: 7, minute: 55, expected: 4 },   // 辰时第4份
            { hour: 8, minute: 10, expected: 5 },   // 辰时第5份
            { hour: 8, minute: 30, expected: 6 },   // 辰时第6份
            { hour: 8, minute: 50, expected: 7 }    // 辰时第7份
        ];
        
        testTimes.forEach(({ hour, minute, expected }) => {
            const part = getBranchPartByTime(branch, hour, minute);
            const starKey = `${branch}-${part}`;
            const star = xingsiNames[starKey];
            console.log(`时间 ${hour}:${minute.toString().padStart(2, '0')} -> 第${part}份 (期望:第${expected}份) -> ${star || '未知'}`);
        });
    };
    
    // 测试子时的分段计算
    const testZiFenCalculation = () => {
        const branch = "子";
        const totalParts = dizhiParts[branch] || 1;
        const totalMinutes = 120; // 2小时
        const partDuration = Math.floor(totalMinutes / totalParts);
        
        console.log(`\n测试"${branch}"时分段计算，共${totalParts}份，每份${partDuration}分钟`);
        
        const testTimes = [
            { hour: 23, minute: 15, expected: 1 },  // 子时第1份
            { hour: 23, minute: 45, expected: 1 },  // 子时第1份
            { hour: 0, minute: 15, expected: 2 },   // 子时第2份
            { hour: 0, minute: 45, expected: 2 }    // 子时第2份
        ];
        
        testTimes.forEach(({ hour, minute, expected }) => {
            const part = getBranchPartByTime(branch, hour, minute);
            const starKey = `${branch}-${part}`;
            const star = xingsiNames[starKey];
            console.log(`时间 ${hour}:${minute.toString().padStart(2, '0')} -> 第${part}份 (期望:第${expected}份) -> ${star || '未知'}`);
        });
    };
    
    // 测试寅时的分段计算
    const testYinFenCalculation = () => {
        const branch = "寅";
        const totalParts = dizhiParts[branch] || 1;
        
        console.log(`\n测试"${branch}"时分段计算，共${totalParts}份`);
        
        const testTimes = [
            { hour: 3, minute: 10, expected: 1 },   // 寅时第1份
            { hour: 3, minute: 30, expected: 2 },   // 寅时第2份
            { hour: 3, minute: 55, expected: 3 },   // 寅时第3份
            { hour: 4, minute: 20, expected: 4 },   // 寅时第4份
            { hour: 4, minute: 45, expected: 5 }    // 寅时第5份
        ];
        
        testTimes.forEach(({ hour, minute, expected }) => {
            const part = getBranchPartByTime(branch, hour, minute);
            const starKey = `${branch}-${part}`;
            const star = xingsiNames[starKey];
            console.log(`时间 ${hour}:${minute.toString().padStart(2, '0')} -> 第${part}份 (期望:第${expected}份) -> ${star || '未知'}`);
        });
    };
    
    // 测试卯时的分段计算
    const testMaoFenCalculation = () => {
        const branch = "卯";
        const totalParts = dizhiParts[branch] || 1;
        
        console.log(`\n测试"${branch}"时分段计算，共${totalParts}份`);
        
        const testTimes = [
            { hour: 5, minute: 15, expected: 1 },   // 卯时第1份
            { hour: 5, minute: 45, expected: 2 },   // 卯时第2份
            { hour: 6, minute: 15, expected: 3 },   // 卯时第3份
            { hour: 6, minute: 45, expected: 4 }    // 卯时第4份
        ];
        
        testTimes.forEach(({ hour, minute, expected }) => {
            const part = getBranchPartByTime(branch, hour, minute);
            const starKey = `${branch}-${part}`;
            const star = xingsiNames[starKey];
            console.log(`时间 ${hour}:${minute.toString().padStart(2, '0')} -> 第${part}份 (期望:第${expected}份) -> ${star || '未知'}`);
        });
    };
    
    // 测试午时的分段计算
    const testWuFenCalculation = () => {
        const branch = "午";
        const totalParts = dizhiParts[branch] || 1;
        
        console.log(`\n测试"${branch}"时分段计算，共${totalParts}份`);
        
        const testTimes = [
            { hour: 11, minute: 15, expected: 1 },  // 午时第1份
            { hour: 11, minute: 50, expected: 2 },  // 午时第2份
            { hour: 12, minute: 30, expected: 3 }   // 午时第3份
        ];
        
        testTimes.forEach(({ hour, minute, expected }) => {
            const part = getBranchPartByTime(branch, hour, minute);
            const starKey = `${branch}-${part}`;
            const star = xingsiNames[starKey];
            console.log(`时间 ${hour}:${minute.toString().padStart(2, '0')} -> 第${part}份 (期望:第${expected}份) -> ${star || '未知'}`);
        });
    };
    
    // 执行测试
    testUnweiFenCalculation();
    testChenFenCalculation();
    testZiFenCalculation();
    testYinFenCalculation();
    testMaoFenCalculation();
    testWuFenCalculation();
    
    console.log("===== 测试完成 =====");
}

// 调试星司计算
function debugXingsiCalculation() {
    console.log("===== 调试星司计算 =====");
    
    try {
        // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // 获取当前时辰和刻
        const currentBranch = getCurrentTimeBranch();
        const currentKe = getCurrentKe();
        
        console.log(`当前时间: ${hour}:${minute.toString().padStart(2, '0')}`);
        console.log(`当前时辰: ${currentBranch}, 当前刻: ${currentKe}`);
        
        // 计算时辰的分段
        const branchPart = getBranchPartByTime(currentBranch, hour, minute);
        console.log(`时辰${currentBranch}的分段计算结果: 第${branchPart}份`);
        
        // 获取时辰对应的星司
        const branchStarKey = `${currentBranch}-${branchPart}`;
        const branchStar = xingsiNames[branchStarKey];
        console.log(`时辰星司: ${branchStarKey} -> ${branchStar || '未找到'}`);
        
        // 获取刻对应的星司
        const keStarKey = `${currentKe}-1`;
        const keStar = xingsiNames[keStarKey];
        console.log(`刻星司: ${keStarKey} -> ${keStar || '未找到'}`);
        
        // 获取机锋门
        const jifengMen = calculateJifengMen();
        if (jifengMen) {
            console.log(`机锋门: 天盘=${jifengMen.tianpan}, 地盘=${jifengMen.dipan}`);
            
            // 计算机锋门天盘星司
            if (jifengMen.tianpan && jifengMen.tianpan !== "无") {
                const tianpanPart = getBranchPartByTime(jifengMen.tianpan, hour, minute);
                const tianpanStarKey = `${jifengMen.tianpan}-${tianpanPart}`;
                const tianpanStar = xingsiNames[tianpanStarKey];
                console.log(`机锋门天盘星司: ${tianpanStarKey} -> ${tianpanStar || '未找到'}`);
            }
            
            // 计算机锋门地盘星司
            const dipanPart = getBranchPartByTime(jifengMen.dipan, hour, minute);
            const dipanStarKey = `${jifengMen.dipan}-${dipanPart}`;
            const dipanStar = xingsiNames[dipanStarKey];
            console.log(`机锋门地盘星司: ${dipanStarKey} -> ${dipanStar || '未找到'}`);
        } else {
            console.log("无法计算机锋门");
        }
        
        // 显示所有地支的当前分段和星司
        console.log("\n所有地支的当前分段和星司:");
        dizhi.forEach(branch => {
            const part = getBranchPartByTime(branch, hour, minute);
            const starKey = `${branch}-${part}`;
            const star = xingsiNames[starKey];
            console.log(`${branch}: 第${part}份 -> ${star || '未找到'}`);
        });
        
        // 在页面上显示调试信息
        const debugInfo = document.createElement('div');
        debugInfo.className = 'alert alert-info mt-3';
        debugInfo.innerHTML = `
            <h5>星司计算调试信息</h5>
            <p>当前时间: ${hour}:${minute.toString().padStart(2, '0')}</p>
            <p>当前时辰: ${currentBranch}, 第${branchPart}份 -> ${branchStar || '未找到'}</p>
            <p>当前刻: ${currentKe} -> ${keStar || '未找到'}</p>
            ${jifengMen ? `
                <p>机锋门: 天盘=${jifengMen.tianpan}, 地盘=${jifengMen.dipan}</p>
                ${jifengMen.tianpan && jifengMen.tianpan !== "无" ? 
                    `<p>机锋门天盘星司: ${jifengMen.tianpan}-${getBranchPartByTime(jifengMen.tianpan, hour, minute)} -> ${xingsiNames[`${jifengMen.tianpan}-${getBranchPartByTime(jifengMen.tianpan, hour, minute)}`] || '未找到'}</p>` : 
                    ''}
                <p>机锋门地盘星司: ${jifengMen.dipan}-${getBranchPartByTime(jifengMen.dipan, hour, minute)} -> ${xingsiNames[`${jifengMen.dipan}-${getBranchPartByTime(jifengMen.dipan, hour, minute)}`] || '未找到'}</p>
            ` : '<p>无法计算机锋门</p>'}
        `;
        
        // 将调试信息添加到页面
        const container = document.querySelector('.container');
        if (container) {
            // 移除之前的调试信息
            const oldDebugInfo = document.querySelector('.alert.alert-info.mt-3');
            if (oldDebugInfo) {
                oldDebugInfo.remove();
            }
            container.appendChild(debugInfo);
        }
        
        console.log("===== 调试完成 =====");
    } catch (error) {
        console.error("调试星司计算时出错:", error);
    }
}

// 测试所有地支的分段计算
function testAllBranchParts() {
    console.log("===== 测试所有地支分段 =====");
    
    try {
        // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        console.log(`当前时间: ${hour}:${minute}`);
        
        // 创建结果容器
        const resultDiv = document.createElement('div');
        resultDiv.className = 'alert alert-primary mt-3';
        resultDiv.innerHTML = `<h5>当前时间 ${hour}:${minute} 的地支分段测试</h5>`;
        
        // 创建表格显示结果
        const table = document.createElement('table');
        table.className = 'table table-striped table-bordered';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>地支</th>
                    <th>总份数</th>
                    <th>当前第几份</th>
                    <th>对应星司</th>
                    <th>星司编号</th>
                    <th>时间范围</th>
                </tr>
            </thead>
            <tbody id="parts-test-body">
            </tbody>
        `;
        
        resultDiv.appendChild(table);
        
        // 将结果添加到页面
        const container = document.querySelector('.container');
        if (container) {
            // 移除之前的测试结果
            const oldResult = document.querySelector('.alert.alert-primary.mt-3');
            if (oldResult) {
                oldResult.remove();
            }
            container.appendChild(resultDiv);
        }
        
        // 获取表格体
        const tableBody = document.getElementById('parts-test-body');
        
        // 获取当前时辰
        const currentBranch = getCurrentTimeBranch();
        console.log(`当前时辰: ${currentBranch}`);
        
        // 测试所有地支
        dizhi.forEach(branch => {
            try {
                // 获取总份数
                const totalParts = dizhiParts[branch] || 1;
                
                // 计算当前份数
                const currentPart = getBranchPartByTime(branch, hour, minute);
                
                // 获取对应星司
                const starKey = `${branch}-${currentPart}`;
                const star = xingsiNames[starKey];
                const starNumber = star ? xingsiNumberMap[star] : '?';
                
                // 计算时间范围
                const totalMinutesInDay = 24 * 60; // 1440分钟
                const minutesPerPart = totalMinutesInDay / totalParts;
                
                const startMinutes = (currentPart - 1) * minutesPerPart;
                const endMinutes = currentPart * minutesPerPart;
                
                const startHour = Math.floor(startMinutes / 60);
                const startMinute = Math.floor(startMinutes % 60);
                const endHour = Math.floor(endMinutes / 60);
                const endMinute = Math.floor(endMinutes % 60);
                
                const startTimeStr = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
                const endTimeStr = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
                
                const timeRange = `${startTimeStr}-${endTimeStr}`;
                
                // 高亮当前时辰
                const isCurrentBranch = (branch === currentBranch);
                
                // 添加到表格
                const row = document.createElement('tr');
                if (isCurrentBranch) {
                    row.className = 'table-success';
                }
                row.innerHTML = `
                    <td>${branch}${isCurrentBranch ? ' (当前时辰)' : ''}</td>
                    <td>${totalParts}</td>
                    <td>${currentPart}</td>
                    <td>${star || '未找到'}</td>
                    <td>${starNumber}</td>
                    <td>${timeRange}</td>
                `;
                
                tableBody.appendChild(row);
                
                console.log(`地支 ${branch}: 共${totalParts}份，当前第${currentPart}份 -> ${star || '未找到'}(${starNumber})，时间范围: ${timeRange}`);
            } catch (error) {
                console.error(`测试地支 ${branch} 时出错:`, error);
            }
        });
        
        console.log("===== 测试完成 =====");
    } catch (error) {
        console.error("测试所有地支分段时出错:", error);
    }
}

// 获取对冲宫
function getOppositeGong(dizhi) {
    const oppositeMap = {
        "子": "午", "午": "子",
        "丑": "未", "未": "丑",
        "寅": "申", "申": "寅",
        "卯": "酉", "酉": "卯",
        "辰": "戌", "戌": "辰",
        "巳": "亥", "亥": "巳"
    };
    return oppositeMap[dizhi] || dizhi;
}

// 获取前一个地支
function getPreviousBranch(dizhi) {
    const dizhiIndex = dizhi.indexOf(dizhi);
    if (dizhiIndex === -1) {
        return null;
    }
    const prevIndex = (dizhiIndex - 1 + dizhi.length) % dizhi.length;
    return dizhi[prevIndex];
}

// 获取后一个地支
function getNextBranch(dizhi) {
    const dizhiIndex = dizhi.indexOf(dizhi);
    if (dizhiIndex === -1) {
        return null;
    }
    const nextIndex = (dizhiIndex + 1) % dizhi.length;
    return dizhi[nextIndex];
}

// 获取地支的索引
function getBranchIndex(branch) {
    return dizhi.indexOf(branch);
}

// 根据索引获取地支
function getBranchByIndex(index) {
    return dizhi[index % 12];
}

// 用神计算和推字功能
function calculateYongShen() {
    try {
        console.log("计算用神...");
        
        // 获取用神选择
        const yongshenSelect = document.getElementById("yongshen-select");
        if (!yongshenSelect) {
            console.error("未找到用神选择元素");
            return;
        }
        
        const selectedYongShen = yongshenSelect.value;
        if (!selectedYongShen) {
            alert("请先选择用神");
            return;
        }
        
        console.log(`选择的用神: ${selectedYongShen}`);
        
        // 获取当前表格中的天盘内容
        const tianpanMap = {};
        
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 4; j++) {
                const cellId = `fill-${i}-${j}`;
                const cell = document.getElementById(cellId);
                if (cell) {
                    const dizhiCell = cell.closest('td').querySelector('.dz-label');
                    if (dizhiCell) {
                        const dizhi = dizhiCell.textContent;
                        const tianpan = cell.textContent;
                        tianpanMap[dizhi] = tianpan;
                        console.log(`位置 ${i}-${j}: 地盘=${dizhi}, 天盘=${tianpan}`);
                    }
                }
            }
        }
        
        // 检查用神在天盘中的位置
        const yongshenTianpan = tianpanMap[selectedYongShen];
        if (!yongshenTianpan || yongshenTianpan === "无") {
            const resultElement = document.getElementById("yongshen-result");
            if (resultElement) {
                resultElement.innerHTML = `<div class="alert alert-warning">用神 ${selectedYongShen} 对应的天盘为空或无效</div>`;
            }
            console.log(`用神 ${selectedYongShen} 对应的天盘为空或无效`);
            return;
        }
        
        console.log(`用神 ${selectedYongShen} 对应的天盘: ${yongshenTianpan}`);
        
        // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // 计算天盘地支对应的星司
        // 提取地支部分（如果包含天干）
        const tianpanDizhi = extractDizhi(yongshenTianpan);
        
        const tianpanPart = getBranchPartByTime(tianpanDizhi, hour, minute);
        const tianpanKey = `${tianpanDizhi}-${tianpanPart}`;
        const tianpanStar = xingsiNames[tianpanKey];
        
        if (!tianpanStar) {
            const resultElement = document.getElementById("yongshen-result");
            if (resultElement) {
                resultElement.innerHTML = `<div class="alert alert-warning">无法找到天盘 ${tianpanDizhi} 对应的星司</div>`;
            }
            console.log(`无法找到天盘 ${tianpanDizhi} 对应的星司`);
            return;
        }
        
        const tianpanStarNumber = xingsiNumberMap[tianpanStar] || 0;
        
        // 计算地盘地支对应的星司
        const dizhiPart = getBranchPartByTime(selectedYongShen, hour, minute);
        const dizhiKey = `${selectedYongShen}-${dizhiPart}`;
        const dizhiStar = xingsiNames[dizhiKey];
        
        if (!dizhiStar) {
            const resultElement = document.getElementById("yongshen-result");
            if (resultElement) {
                resultElement.innerHTML = `<div class="alert alert-warning">无法找到地盘 ${selectedYongShen} 对应的星司</div>`;
            }
            console.log(`无法找到地盘 ${selectedYongShen} 对应的星司`);
            return;
        }
        
        const dizhiStarNumber = xingsiNumberMap[dizhiStar] || 0;
        
        // 计算天机推字结果
        const tianjiResult = calculateTuiziForYongShen(tianpanStar, dizhiStarNumber);
        
        // 计算地机（天机对冲宫）
        const dijiGong = getOppositeGong(selectedYongShen);
        console.log(`地机宫位: ${dijiGong} (${selectedYongShen}的对冲宫)`);
        
        // 检查地机宫位是否有效
        if (!dijiGong) {
            console.error(`无法找到 ${selectedYongShen} 的对冲宫`);
            return;
        }
        
        // 计算地机对应的天盘
        const dijiTianpan = tianpanMap[dijiGong];
        if (!dijiTianpan || dijiTianpan === "无") {
            console.error(`地机宫位 ${dijiGong} 对应的天盘为空或无效`);
            return;
        }
        
        // 计算地机天盘对应的星司
        // 提取地支部分（如果包含天干）
        const dijiTianpanDizhi = extractDizhi(dijiTianpan);
        
        const dijiTianpanPart = getBranchPartByTime(dijiTianpanDizhi, hour, minute);
        const dijiTianpanKey = `${dijiTianpanDizhi}-${dijiTianpanPart}`;
        const dijiTianpanStar = xingsiNames[dijiTianpanKey];
        
        if (!dijiTianpanStar) {
            console.error(`无法找到地机天盘 ${dijiTianpanDizhi} 对应的星司，key=${dijiTianpanKey}`);
            return;
        }
        
        const dijiTianpanStarNumber = xingsiNumberMap[dijiTianpanStar] || 0;
        console.log(`地机天盘星司: ${dijiTianpanStar}(${dijiTianpanStarNumber})`);
        
        // 计算地机推字结果
        const dijiResult = calculateTuiziForYongShen(dijiTianpanStar, dizhiStarNumber);
        console.log(`地机推字结果: ${dijiResult}`);
        
        // 计算人机（下拉框选择的天盘，在第一层盘中对应的地盘位置）
        const tianpanSelect = document.getElementById('tianpan');
        let selectedValue = "";
        
        if (tianpanSelect && tianpanSelect.value && tianpanSelect.value !== "无") {
            // 如果天盘下拉框有选择值，则使用该值
            selectedValue = tianpanSelect.value;
            console.log(`使用天盘下拉框选择的值: ${selectedValue}`);
        } else {
            // 如果天盘下拉框未选择或选择了"无"，则使用当前时间计算的刻值
            const currentKe = getCurrentKe();
            selectedValue = currentKe;
            console.log(`使用当前刻: ${selectedValue}`);
        }
        
        if (!selectedValue) {
            console.error("无法获取有效的刻值");
            return;
        }
        
        // 提取地支部分（如果包含天干）
        const selectedDizhi = extractDizhi(selectedValue);
        console.log(`选择的地支: ${selectedDizhi}`);
        
        // 这个地支就是人机的地盘位置
        const renjiDipan = selectedDizhi;
        
        // 在第一层盘（原始天盘地盘映射）中找到对应的天盘值
        // 使用变量selectedTianpan代替renjiTianpanDizhi避免重复声明错误
        const selectedTianpan = tianpanMap[renjiDipan];
        
        if (!selectedTianpan || selectedTianpan === "无") {
            console.error(`在第一层盘中未找到地盘 ${renjiDipan} 对应的天盘`);
                return;
        }
        
        console.log(`人机: 地盘=${renjiDipan}, 天盘=${selectedTianpan}`);
        
        console.log(`人机地盘: ${renjiDipan}`);
        
        // 计算人机地盘对应的星司
        const renjiDipanPart = getBranchPartByTime(renjiDipan, hour, minute);
        const renjiDipanKey = `${renjiDipan}-${renjiDipanPart}`;
        const renjiDipanStar = xingsiNames[renjiDipanKey];
        
        if (!renjiDipanStar) {
            console.error(`无法找到人机地盘 ${renjiDipan} 对应的星司`);
            return;
        }
        
        const renjiDipanStarNumber = xingsiNumberMap[renjiDipanStar] || 0;
        console.log(`人机地盘星司: ${renjiDipanStar}(${renjiDipanStarNumber})`);
        
        // 计算人机天盘对应的星司
        // 提取地支部分（如果包含天干）
        const renjiTianpanDizhi = extractDizhi(selectedTianpan);
        
        const renjiTianpanPart = getBranchPartByTime(renjiTianpanDizhi, hour, minute);
        const renjiTianpanKey = `${renjiTianpanDizhi}-${renjiTianpanPart}`;
        const renjiTianpanStar = xingsiNames[renjiTianpanKey];
        
        if (!renjiTianpanStar) {
            console.error(`无法找到人机天盘 ${renjiTianpanDizhi} 对应的星司，key=${renjiTianpanKey}`);
            return;
        }
        
        const renjiTianpanStarNumber = xingsiNumberMap[renjiTianpanStar] || 0;
        console.log(`人机天盘星司: ${renjiTianpanStar}(${renjiTianpanStarNumber})`);
        
        // 计算人机推字结果
        const renjiResult = calculateTuiziForYongShen(renjiTianpanStar, renjiDipanStarNumber);
        
        // 注意：二层盘、人气、天气、地气的计算现在都在showErcengpan函数中
        
        // 天气和地气的计算已移至showErcengpan函数中
        
        // 地气的计算已移至showErcengpan函数中
        
        // 获取当前刻
        const currentKe = getCurrentKe();
        console.log(`当前刻: ${currentKe}`);
        
        // 计算机锋门
        const jifengMen = calculateJifengMen();
        let jifengTianpan = "无";
        let jifengDipan = "无";
        let jifengTianpanStar = "无";
        let jifengDipanStar = "无";
        let jifengTianpanStarNumber = "?";
        let jifengDipanStarNumber = "?";
        let jifengResult = "无法计算";
        
        if (jifengMen && jifengMen.tianpan && jifengMen.dipan) {
            jifengTianpan = jifengMen.tianpan;
            jifengDipan = jifengMen.dipan;
            
            // 计算机锋门天盘星司
            // 提取地支部分
            const jifengTianpanDizhi = extractDizhi(jifengTianpan);
            
            const jifengTianpanPart = getBranchPartByTime(jifengTianpanDizhi, hour, minute);
            const jifengTianpanKey = `${jifengTianpanDizhi}-${jifengTianpanPart}`;
            jifengTianpanStar = xingsiNames[jifengTianpanKey] || "无";
            jifengTianpanStarNumber = xingsiNumberMap[jifengTianpanStar] || "?";
            
            // 计算机锋门地盘星司
            const jifengDipanPart = getBranchPartByTime(jifengDipan, hour, minute);
            const jifengDipanKey = `${jifengDipan}-${jifengDipanPart}`;
            jifengDipanStar = xingsiNames[jifengDipanKey] || "无";
            jifengDipanStarNumber = xingsiNumberMap[jifengDipanStar] || "?";
            
            // 计算机锋门推字
            jifengResult = calculateTuiziForYongShen(jifengTianpanStar, jifengDipanStarNumber);
        }
        
        // 计算善司（刻前一宫，逆时针方向）
        const keIndex = getBranchIndex(currentKe);
        const prevKeIndex = (keIndex - 1 + 12) % 12;
        const prevKe = getBranchByIndex(prevKeIndex);
        console.log(`刻前一宫(逆时针): ${prevKe}`);
        
        // 善司地盘位置就是刻前一宫（不再用对冲宫）
        const shansiDipan = prevKe;
        console.log(`善司地盘: ${shansiDipan}`);
        
        // 计算善司对应的天盘
        const shansiTianpan = tianpanMap[shansiDipan];
        if (!shansiTianpan || shansiTianpan === "无") {
            console.error(`善司地盘 ${shansiDipan} 对应的天盘为空或无效`);
            return;
        }
        
        console.log(`善司: ${shansiTianpan}+${shansiDipan}`);
        
        // 计算善司地盘对应的星司
        const shansiDipanPart = getBranchPartByTime(shansiDipan, hour, minute);
        const shansiDipanKey = `${shansiDipan}-${shansiDipanPart}`;
        const shansiDipanStar = xingsiNames[shansiDipanKey];
        
        if (!shansiDipanStar) {
            console.error(`无法找到善司地盘 ${shansiDipan} 对应的星司`);
            return;
        }
        
        const shansiDipanStarNumber = xingsiNumberMap[shansiDipanStar] || 0;
        
        // 计算善司天盘对应的星司
        // 提取地支部分（如果包含天干）
        const shansiTianpanDizhi = extractDizhi(shansiTianpan);
        
        const shansiTianpanPart = getBranchPartByTime(shansiTianpanDizhi, hour, minute);
        const shansiTianpanKey = `${shansiTianpanDizhi}-${shansiTianpanPart}`;
        const shansiTianpanStar = xingsiNames[shansiTianpanKey];
        
        if (!shansiTianpanStar) {
            console.error(`无法找到善司天盘 ${shansiTianpanDizhi} 对应的星司`);
            return;
        }
        
        const shansiTianpanStarNumber = xingsiNumberMap[shansiTianpanStar] || 0;
        
        // 计算善司推字结果
        const shansiResult = calculateTuiziForYongShen(shansiTianpanStar, shansiDipanStarNumber);
        
        // 计算值使（刻后一宫，顺时针方向）
        const nextKeIndex = (keIndex + 1) % 12;
        const nextKe = getBranchByIndex(nextKeIndex);
        console.log(`刻后一宫(顺时针): ${nextKe}`);
        
        // 值使地盘位置就是刻后一宫（不再用对冲宫）
        const zhishiDipan = nextKe;
        console.log(`值使地盘: ${zhishiDipan}`);
        
        // 计算值使对应的天盘
        const zhishiTianpan = tianpanMap[zhishiDipan];
        if (!zhishiTianpan || zhishiTianpan === "无") {
            console.error(`值使地盘 ${zhishiDipan} 对应的天盘为空或无效`);
            return;
        }
        
        console.log(`值使: ${zhishiTianpan}+${zhishiDipan}`);
        
        // 计算值使地盘对应的星司
        const zhishiDipanPart = getBranchPartByTime(zhishiDipan, hour, minute);
        const zhishiDipanKey = `${zhishiDipan}-${zhishiDipanPart}`;
        const zhishiDipanStar = xingsiNames[zhishiDipanKey];
        
        if (!zhishiDipanStar) {
            console.error(`无法找到值使地盘 ${zhishiDipan} 对应的星司`);
            return;
        }
        
        const zhishiDipanStarNumber = xingsiNumberMap[zhishiDipanStar] || 0;
        
        // 计算值使天盘对应的星司
        // 提取地支部分（如果包含天干）
        const zhishiTianpanDizhi = extractDizhi(zhishiTianpan);
        
        const zhishiTianpanPart = getBranchPartByTime(zhishiTianpanDizhi, hour, minute);
        const zhishiTianpanKey = `${zhishiTianpanDizhi}-${zhishiTianpanPart}`;
        const zhishiTianpanStar = xingsiNames[zhishiTianpanKey];
        
        if (!zhishiTianpanStar) {
            console.error(`无法找到值使天盘 ${zhishiTianpanDizhi} 对应的星司`);
            return;
        }
        
        const zhishiTianpanStarNumber = xingsiNumberMap[zhishiTianpanStar] || 0;
        
        // 计算值使推字结果
        const zhishiResult = calculateTuiziForYongShen(zhishiTianpanStar, zhishiDipanStarNumber);
        
        // 获取占卜类型（他占/自占）
        const taZhanRadio = document.getElementById("taZhan");
        const isForOthers = taZhanRadio && taZhanRadio.checked;
        const zhanType = isForOthers ? "他占" : "自占";
        
        // 更新结果显示
        const resultElement = document.getElementById("yongshen-result");
        if (resultElement) {
            resultElement.innerHTML = `
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-header bg-success text-white">
                                天机
                            </div>
                            <div class="card-body">
                                <p>${tianpanDizhi}+${selectedYongShen}</p>
                                <p>${tianpanStar}+${dizhiStar}</p>
                                <p><span class="badge bg-success">${tianjiResult}</span></p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-header bg-info text-white">
                                地机
                            </div>
                            <div class="card-body">
                                <p>${dijiTianpanDizhi}+${dijiGong}</p>
                                <p>${dijiTianpanStar}+${dizhiStar}</p>
                                <p><span class="badge bg-info">${dijiResult}</span></p>
                        </div>
                    </div>
                </div>
                
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-header bg-warning text-dark">
                                人机
                            </div>
                            <div class="card-body">
                                <p>${renjiTianpanDizhi}+${renjiDipan}</p>
                                <p>${renjiTianpanStar}+${renjiDipanStar}</p>
                                <p><span class="badge bg-warning text-dark">${renjiResult}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12 mb-3 text-center">
                        <div class="card">
                            <div class="card-header bg-primary text-white">
                                二层盘
                            </div>
                            <div class="card-body text-center">
                                <button class="btn btn-outline-primary" id="ercengpan-btn">显示二层盘</button>
                                <p class="small text-muted mt-2">点击按钮查看二层盘并计算人气、天气、地气</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="ercengpan-container" class="mt-3" style="display: none;"></div>
                <div id="sancengpan-container" class="mt-3" style="display: none;"></div>
                
                <div class="small text-muted mt-3">
                    <p>占卜类型: ${zhanType}</p>
                    <p>计算时间: ${hour}:${minute.toString().padStart(2, '0')}</p>
                </div>
            `;
            
            // 添加二层盘按钮的点击事件
            const ercengpanBtn = document.getElementById("ercengpan-btn");
            if (ercengpanBtn) {
                ercengpanBtn.addEventListener("click", function() {
                    showErcengpan(tianpanMap);
                });
                console.log("二层盘按钮事件已绑定");
            }
            
            // 删除三层盘按钮事件 - 现在在二层盘函数中添加
        }
        
        console.log("用神计算完成");
    } catch (error) {
        console.error("计算用神时出错:", error);
    }
}

// 显示二层盘
function showErcengpan(tianpanMap) {
    console.log("显示二层盘...");
    
    // 获取容器元素
    const container = document.getElementById("ercengpan-container");
    if (!container) {
        console.error("未找到二层盘容器元素");
        return;
    }
    
    // 切换显示状态
    if (container.style.display === "none") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
        return;
    }
    
    // 获取用神选择
    const yongshenSelect = document.getElementById("yongshen-select");
    if (!yongshenSelect || !yongshenSelect.value) {
        container.innerHTML = `<div class="alert alert-warning">请先选择用神</div>`;
        return;
    }
    
    const selectedYongShen = yongshenSelect.value;
    console.log(`二层盘用神: ${selectedYongShen}`);
    
    // 定义地盘布局
    const dipanLayout = [
        ["巳", "午", "未", "申"],
        ["辰", "空", "空", "酉"],
        ["卯", "空", "空", "戌"],
        ["寅", "丑", "子", "亥"]
    ];
    
    // 查找天机的天盘值和地机宫位
    // 获取天机的天盘值
    const tianjiTianpan = tianpanMap[selectedYongShen];
    if (!tianjiTianpan || tianjiTianpan === "无") {
        console.error("天机的天盘无效");
        container.innerHTML = `<div class="alert alert-warning">天机的天盘无效</div>`;
        return;
    }
    const tianpanDizhi = extractDizhi(tianjiTianpan);
    
    // 计算地机宫位
    const dijiGong = getOppositeGong(selectedYongShen);
    
    console.log(`用神: ${selectedYongShen}, 天机的天盘: ${tianpanDizhi}, 地机宫位: ${dijiGong}`);
    
    // 创建天盘排列
    const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    
    // 找到天机天盘在branches中的索引
    const tianpanDizhiIndex = branches.indexOf(tianpanDizhi);
    if (tianpanDizhiIndex === -1) {
        console.error(`天机天盘 ${tianpanDizhi} 不是有效的地支`);
        container.innerHTML = `<div class="alert alert-warning">无法计算二层盘：天机天盘 ${tianpanDizhi} 不是有效的地支</div>`;
        return;
    }
    
    // 找到地机宫位在branches中的索引
    const dijiGongIndex = branches.indexOf(dijiGong);
    if (dijiGongIndex === -1) {
        console.error(`地机宫位 ${dijiGong} 不是有效的地支`);
        container.innerHTML = `<div class="alert alert-warning">无法计算二层盘：地机宫位 ${dijiGong} 不是有效的地支</div>`;
        return;
    }
    
    // 创建二层盘映射（地盘->天盘）
    const ercengPanMap = {};
    
    // 首先，将天机的天盘放在地机的地盘位置上
    ercengPanMap[dijiGong] = tianpanDizhi;
    console.log(`二层盘：将天机的天盘 ${tianpanDizhi} 放在地机的地盘 ${dijiGong} 位置上`);
    
    // 然后从天盘地支开始，真正的逆时针排列其余天盘
    for (let i = 1; i < 12; i++) {
        // 计算地支在地盘中的位置（正向顺序+i）
        const dipanIndex = (dijiGongIndex + i) % 12;
        const dipanBranch = branches[dipanIndex];
        
        // 从起点天盘索引开始，减去偏移量（因为是逆时针）
        // 使用与第一层盘相同的逆时针逻辑
        const tianpanIndex = (tianpanDizhiIndex - i + 12) % 12;
        const tianpanValue = branches[tianpanIndex];
        
        // 设置地盘到天盘的映射
        ercengPanMap[dipanBranch] = tianpanValue;
        console.log(`二层盘：地盘 ${dipanBranch} -> 天盘 ${tianpanValue}`);
    }
    
    // 创建二层盘表格
    let tableHtml = `
    <div class="mb-3 alert alert-success">
        二层盘：天机的天盘${tianpanDizhi}放在地机的地盘${dijiGong}位置上，然后逆时针排列
    </div>
    <div class="table-responsive">
        <table class="table table-bordered text-center ercengpan-table">
    `;
    
    for (let row = 0; row < 4; row++) {
        tableHtml += '<tr>';
        
        for (let col = 0; col < 4; col++) {
            const dizhiValue = dipanLayout[row][col];
            
            if (dizhiValue === "空") {
                if (row === 1 && col === 1) {
                    tableHtml += '<td colspan="2" rowspan="2" class="center-cell bg-light">';
                    tableHtml += '<div class="center-text">二层盘</div>';
                    tableHtml += '</td>';
                }
            } else {
                // 获取这个地支对应的天盘值
                const tianpanValue = ercengPanMap[dizhiValue] || "无";
                
                // 突出显示天机的天盘和地机的地盘
                let specialClass = "";
                if (dizhiValue === dijiGong && tianpanValue === tianpanDizhi) {
                    specialClass = "bg-primary text-white"; // 天机天盘放在地机地盘的位置
                }
                
                tableHtml += `<td class="position-relative ${specialClass}">`;
                tableHtml += `<div class="tp-label">${tianpanValue}</div>`;
                tableHtml += `<div class="dz-label">${dizhiValue}</div>`;
                tableHtml += '</td>';
            }
        }
        
        tableHtml += '</tr>';
    }
    
    tableHtml += '</table></div>';
    tableHtml += '<div class="small text-muted mt-2">注：蓝色背景表示天机的天盘放在地机的地盘位置上</div>';
    
    // 获取当前时间
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // 计算人气、天气、地气
    // ----- 人气卡片（基于二层盘） -----
    console.log("计算人气（基于二层盘）...");
    
    // 获取下拉框选择的天盘或当前刻值
    const renqiTianpanSelect = document.getElementById('tianpan');
    let renqiSelectedValue = "";
    
    if (renqiTianpanSelect && renqiTianpanSelect.value && renqiTianpanSelect.value !== "无") {
        // 如果天盘下拉框有选择值，则使用该值
        renqiSelectedValue = renqiTianpanSelect.value;
        console.log(`使用天盘下拉框选择的值: ${renqiSelectedValue}`);
    } else {
        // 如果天盘下拉框未选择或选择了"无"，则使用当前时间计算的刻值
        const currentKe = getCurrentKe();
        renqiSelectedValue = currentKe;
        console.log(`使用当前刻: ${renqiSelectedValue}`);
    }
    
            // 提取地支部分（如果包含天干）
    const renqiSelectedDizhi = extractDizhi(renqiSelectedValue);
    console.log(`人气选择的地支: ${renqiSelectedDizhi}`);
    
    // 在二层盘中找天盘为所选地支的地盘位置
    let renqiDipan = null;
    for (const [dipan, tianpan] of Object.entries(ercengPanMap)) {
        if (tianpan === renqiSelectedDizhi) {
            renqiDipan = dipan;
            break;
        }
    }
    
    if (!renqiDipan) {
        console.error(`在二层盘中未找到天盘为${renqiSelectedDizhi}的地盘位置`);
        renqiDipan = dijiGong; // 如果找不到，使用默认的地机宫位作为地盘
    }
    
    const renqiTianpan = renqiSelectedDizhi; // 选择的天盘值
    
    // 计算人气天盘星司
    const renqiTianpanPart = getBranchPartByTime(renqiTianpan, hour, minute);
    const renqiTianpanKey = `${renqiTianpan}-${renqiTianpanPart}`;
    const renqiTianpanStar = xingsiNames[renqiTianpanKey];
    const renqiTianpanStarNumber = xingsiNumberMap[renqiTianpanStar] || 0;
    console.log(`人气天盘星司: ${renqiTianpanStar}(${renqiTianpanStarNumber})`);
    
    // 计算人气地盘星司
    const renqiDipanPart = getBranchPartByTime(renqiDipan, hour, minute);
    const renqiDipanKey = `${renqiDipan}-${renqiDipanPart}`;
    const renqiDipanStar = xingsiNames[renqiDipanKey];
    const renqiDipanStarNumber = xingsiNumberMap[renqiDipanStar] || 0;
    console.log(`人气地盘星司: ${renqiDipanStar}(${renqiDipanStarNumber})`);
    
    // 计算人气推字结果
    const renqiResult = calculateTuiziForYongShen(renqiTianpanStar, renqiDipanStarNumber);
    console.log(`人气推字结果: ${renqiResult}`);

    // ----- 地气卡片（基于二层盘） -----
    console.log("计算地气（基于二层盘）...");
    // 地气 = 天盘为用神 + 天盘为用神对应的地盘
    const diqiTianpan = selectedYongShen;  // 用神本身作为天盘
    
    // 找到二层盘中天盘为用神的地盘位置
    let diqiDipan = null;
    for (const [dipan, tianpan] of Object.entries(ercengPanMap)) {
        if (tianpan === selectedYongShen) {
            diqiDipan = dipan;
            break;
        }
    }
    
    // 如果找不到天盘为用神的地盘位置
    if (!diqiDipan) {
        console.error(`在二层盘中未找到天盘为${selectedYongShen}的地盘位置`);
        diqiDipan = "未知";
    }
    
    console.log(`地气（基于二层盘）: 天盘=${diqiTianpan}, 地盘=${diqiDipan}`);
    
    // 计算地气天盘星司
    const diqiTianpanPart = getBranchPartByTime(diqiTianpan, hour, minute);
    const diqiTianpanKey = `${diqiTianpan}-${diqiTianpanPart}`;
    const diqiTianpanStar = xingsiNames[diqiTianpanKey];
    const diqiTianpanStarNumber = xingsiNumberMap[diqiTianpanStar] || 0;
    console.log(`地气天盘星司: ${diqiTianpanStar}(${diqiTianpanStarNumber})`);
    
    // 计算地气地盘星司
    const diqiDipanPart = getBranchPartByTime(diqiDipan, hour, minute);
    const diqiDipanKey = `${diqiDipan}-${diqiDipanPart}`;
    const diqiDipanStar = xingsiNames[diqiDipanKey];
    const diqiDipanStarNumber = xingsiNumberMap[diqiDipanStar] || 0;
    console.log(`地气地盘星司: ${diqiDipanStar}(${diqiDipanStarNumber})`);
    
    // 计算地气推字结果
    const diqiResult = calculateTuiziForYongShen(diqiTianpanStar, diqiDipanStarNumber);
    console.log(`地气推字结果: ${diqiResult}`);

    // ----- 天气卡片（基于二层盘） -----
    console.log("计算天气（基于二层盘）...");
    // 天气 = 地盘为用神对应的天盘 + 地盘为用神
    const tianqiTianpan = ercengPanMap[selectedYongShen]; // 二层盘中地盘为用神对应的天盘
    const tianqiDipan = selectedYongShen;                 // 用神本身作为地盘
    
    console.log(`天气（基于二层盘）: 天盘=${tianqiTianpan}, 地盘=${tianqiDipan}`);
    
    // 计算天气天盘星司
    const tianqiTianpanPart = getBranchPartByTime(tianqiTianpan, hour, minute);
    const tianqiTianpanKey = `${tianqiTianpan}-${tianqiTianpanPart}`;
    const tianqiTianpanStar = xingsiNames[tianqiTianpanKey];
    const tianqiTianpanStarNumber = xingsiNumberMap[tianqiTianpanStar] || 0;
    console.log(`天气天盘星司: ${tianqiTianpanStar}(${tianqiTianpanStarNumber})`);
    
    // 计算天气地盘星司
    const tianqiDipanPart = getBranchPartByTime(tianqiDipan, hour, minute);
    const tianqiDipanKey = `${tianqiDipan}-${tianqiDipanPart}`;
    const tianqiDipanStar = xingsiNames[tianqiDipanKey];
    const tianqiDipanStarNumber = xingsiNumberMap[tianqiDipanStar] || 0;
    console.log(`天气地盘星司: ${tianqiDipanStar}(${tianqiDipanStarNumber})`);
    
    // 计算天气推字结果
    const tianqiResult = calculateTuiziForYongShen(tianqiTianpanStar, tianqiDipanStarNumber);
    console.log(`天气推字结果: ${tianqiResult}`);
    
    // 获取占卜类型（他占/自占）
    const taZhanRadio = document.getElementById("taZhan");
    const isForOthers = taZhanRadio && taZhanRadio.checked;
    const zhanType = isForOthers ? "他占" : "自占";
    
    // 添加人气、天气、地气卡片
    tableHtml += `
    <div class="row mt-4">
        <h4>二层盘分析</h4>
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-header bg-danger text-white">
                    人气
                </div>
                <div class="card-body">
                    <p>${renqiTianpan}+${renqiDipan}</p>
                    <p>${renqiTianpanStar}+${renqiDipanStar}</p>
                    <p><span class="badge bg-danger">${renqiResult}</span></p>
                    <p class="small text-muted">天机天盘+地机地盘（二层盘中两者重合）</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-header bg-success text-white">
                    天气
                </div>
                <div class="card-body">
                    <p>${tianqiTianpan}+${tianqiDipan}</p>
                    <p>${tianqiTianpanStar}+${tianqiDipanStar}</p>
                    <p><span class="badge bg-success">${tianqiResult}</span></p>
                    <p class="small text-muted">用神地盘对应的天盘+用神地盘（基于二层盘）</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-header bg-info text-white">
                    地气
                </div>
                <div class="card-body">
                    <p>${diqiTianpan}+${diqiDipan}</p>
                    <p>${diqiTianpanStar}+${diqiDipanStar}</p>
                    <p><span class="badge bg-info">${diqiResult}</span></p>
                    <p class="small text-muted">天盘为用神+该天盘对应的地盘（基于二层盘）</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="small text-muted mt-3">
        <p>占卜类型: ${zhanType}</p>
        <p>计算时间: ${hour}:${minute.toString().padStart(2, '0')}</p>
    </div>
    `;
    
    // 计算二层盘的机锋
    console.log("计算二层盘的机锋...");
    // 获取初始天盘（下拉框选择的）
    const initialTianpanSelect = document.getElementById('tianpan');
    const initialTianpan = initialTianpanSelect.value || getCurrentKe();
    const initialTianpanDizhi = extractDizhi(initialTianpan);
    console.log(`初始天盘: ${initialTianpanDizhi}`);
    
    // 计算六合地支
    const liuHeDizhi = liuheMap[initialTianpanDizhi];
    if (!liuHeDizhi) {
        console.error(`找不到地支${initialTianpanDizhi}的六合关系`);
    }
    
    // 机锋: 找到地盘为六合地支的宫位
    const ercengJifengDipan = liuHeDizhi;  // 地盘就是六合地支
    const ercengJifengTianpan = ercengPanMap[ercengJifengDipan] || "无"; // 查找该地盘对应的天盘
    
    console.log(`二层盘机锋: 找到地盘为${liuHeDizhi}的宫位，天盘=${ercengJifengTianpan}`);
    
    // 计算星司
    const ercengJifengTianpanPart = getBranchPartByTime(ercengJifengTianpan, hour, minute);
    const ercengJifengTianpanKey = `${ercengJifengTianpan}-${ercengJifengTianpanPart}`;
    const ercengJifengTianpanStar = xingsiNames[ercengJifengTianpanKey];
    
    const ercengJifengDipanPart = getBranchPartByTime(ercengJifengDipan, hour, minute);
    const ercengJifengDipanKey = `${ercengJifengDipan}-${ercengJifengDipanPart}`;
    const ercengJifengDipanStar = xingsiNames[ercengJifengDipanKey];
    
    // 计算推字
    const ercengJifengDipanStarNumber = xingsiNumberMap[ercengJifengDipanStar] || 0;
    const ercengJifengResult = calculateTuiziForYongShen(ercengJifengTianpanStar, ercengJifengDipanStarNumber);
    
    // 添加二层盘的机锋卡片
    tableHtml += `
    <div class="row mt-4">
        <div class="col-md-12 mb-3">
            <div class="card">
                <div class="card-header bg-danger text-white">
                    二层盘机锋
                </div>
                <div class="card-body">
                    <p>${ercengJifengTianpan}+${ercengJifengDipan}</p>
                    <p>${ercengJifengTianpanStar}+${ercengJifengDipanStar}</p>
                    <p><span class="badge bg-danger">${ercengJifengResult}</span></p>
                    <p class="small text-muted">初始天盘(${initialTianpanDizhi})的六合地支(${liuHeDizhi})在二层盘中</p>
                </div>
            </div>
        </div>
    </div>
    `;

    container.innerHTML = tableHtml;
    console.log("二层盘显示完成");

    // 添加三层盘按钮
    const sancengpanBtnContainer = document.createElement('div');
    sancengpanBtnContainer.className = 'row mt-4';
    sancengpanBtnContainer.innerHTML = `
        <div class="col-md-12 mb-3 text-center">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    三层盘
                </div>
                <div class="card-body text-center">
                    <button class="btn btn-outline-primary" id="sancengpan-btn">显示三层盘</button>
                    <p class="small text-muted mt-2">点击按钮查看三层盘</p>
                </div>
            </div>
        </div>
    `;
    container.appendChild(sancengpanBtnContainer);

    // 添加三层盘按钮的点击事件
    const sancengpanBtn = document.getElementById("sancengpan-btn");
    if (sancengpanBtn) {
        sancengpanBtn.addEventListener("click", function() {
            showSancengpan(tianpanMap);
        });
        console.log("三层盘按钮事件已绑定");
    }
}

// 用神推字计算
function calculateTuiziForYongShen(tianpanStar, dizhiNumber) {
    try {
        console.log(`计算推字: 天盘星司=${tianpanStar}, 地盘星司数=${dizhiNumber}`);
        
        // 获取天盘星司对应的推字表
        const tuiziList = xingsiTuiziMap[tianpanStar];
        if (!tuiziList || tuiziList.length === 0) {
            console.error(`未找到星司 ${tianpanStar} 的推字表`);
            return "无法计算";
        }
        
        // 获取占卜类型
        const taZhanRadio = document.getElementById("taZhan");
        const isForOthers = taZhanRadio && taZhanRadio.checked;
        
        console.log(`占卜类型: ${isForOthers ? "他占" : "自占"}`);
        
        // 确保dizhiNumber是数字类型
        const numValue = parseInt(dizhiNumber);
        if (isNaN(numValue)) {
            console.error(`无效的地盘星司数: ${dizhiNumber}`);
            return "无法计算";
        }
        
        // 计算推字索引
        let index;
        if (isForOthers) {
            // 他占：顺数
            index = (numValue - 1) % tuiziList.length;
            console.log(`他占顺数: 地盘星司数=${numValue}，在天盘星司推字表中顺数第${index + 1}个字`);
        } else {
            // 自占：逆数
            index = (tuiziList.length - numValue % tuiziList.length) % tuiziList.length;
            if (numValue % tuiziList.length === 0) {
                index = 0;
            }
            console.log(`自占逆数: 地盘星司数=${numValue}，在天盘星司推字表中逆数第${tuiziList.length - index}个字`);
        }
        
        // 确保索引在有效范围内
        if (index < 0) index = 0;
        if (index >= tuiziList.length) index = tuiziList.length - 1;
        
        const result = tuiziList[index];
        console.log(`推字结果: 索引=${index}, 结果=${result}`);
        
        return result;
    } catch (error) {
        console.error("计算推字时出错:", error);
        return "计算错误";
    }
}

// 五子元遁规则
function getWuziYuandun(shiGan, branch) {
    // 甲己还加甲，乙庚丙作初。丙辛从戊起，丁壬庚子居。戊癸起壬子，周而复始求。
    let startGan;
    
    switch(shiGan) {
        case "甲":
        case "己":
            startGan = "甲";
            break;
        case "乙":
        case "庚":
            startGan = "丙";
            break;
        case "丙":
        case "辛":
            startGan = "戊";
            break;
        case "丁":
        case "壬":
            startGan = "庚";
            break;
        case "戊":
        case "癸":
            startGan = "壬";
            break;
        default:
            startGan = "甲"; // 默认值
    }
    
    // 计算起始天干的索引
    const startGanIndex = tiangan.indexOf(startGan);
    
    // 计算地支的索引
    const dizhiIndex = dizhi.indexOf(branch);
    
    // 按顺时针方向推进
    const resultGanIndex = (startGanIndex + dizhiIndex) % 10;
    
    return tiangan[resultGanIndex];
}

// 根据日期计算日干
function getDayGan(date) {
    // 使用农历工具计算
    const dayGanZhi = LunarUtil.getDayGanZhi(date);
    console.log(`使用农历工具计算日期 ${date.toLocaleDateString()} 的日干支: ${dayGanZhi.ganZhi}`);
    return dayGanZhi.gan;
}

// 根据时辰和日干计算时干
function getTimeGan(branch, dayGan) {
    // 使用农历工具计算
    const timeGan = LunarUtil.getTimeGan(dayGan, branch);
    console.log(`时干计算: 日干=${dayGan}, 时辰=${branch} => 时干=${timeGan}`);
    return timeGan;
}

// 获取当前的时干
function getCurrentTimeGan() {
    // 使用农历工具获取当前时间的四柱信息
    const currentTime = LunarUtil.getCurrentTime();
    console.log(`当前四柱: 日干支=${currentTime.dayGanZhi}, 时干支=${currentTime.timeGanZhi}`);
    return currentTime.timeGan;
}

// 根据小时获取对应的地支时辰
function getTimeBranchByHour(hour) {
    const hourMap = {
        23: "子", 0: "子",
        1: "丑", 2: "丑",
        3: "寅", 4: "寅",
        5: "卯", 6: "卯",
        7: "辰", 8: "辰",
        9: "巳", 10: "巳",
        11: "午", 12: "午",
        13: "未", 14: "未",
        15: "申", 16: "申",
        17: "酉", 18: "酉",
        19: "戌", 20: "戌",
        21: "亥", 22: "亥"
    };
    
    return hourMap[hour] || "子"; // 默认返回子时
}

// 根据地支获取对应的起始小时
function getHourStartByBranch(branch) {
    const branchMap = {
        "子": 23,
        "丑": 1,
        "寅": 3,
        "卯": 5,
        "辰": 7,
        "巳": 9,
        "午": 11,
        "未": 13,
        "申": 15,
        "酉": 17,
        "戌": 19,
        "亥": 21
    };
    
    return branchMap[branch] || -1;
}

// 天干推字数据
const tianganTuiziMap = {
    "甲": ["进战", "退守", "偷劫", "行刺", "袭击", "截路", "举用", "黜退"],
    "乙": ["告退", "谋任", "诈诱", "用间", "反叛", "私通", "弑夺", "诛戮"],
    "丙": ["邀请", "埋伏", "互换", "求救", "应援", "设疑", "出奇", "诈降"],
    "丁": ["投诚", "逃遁", "休息", "提调", "分拨", "扼险", "游说", "结纳"],
    "戊": ["投诚", "逃遁", "休息", "提调", "分拨", "扼险", "游说", "结纳"],
    "己": ["佯败", "野桃", "施惠", "赦宥", "先动", "后举", "掩袭", "用人"],
    "庚": ["接引", "密谋", "乘雨", "乘雪", "暗乘", "赏劳", "羞辱", "禁锢"],
    "辛": ["阵战", "夹攻", "穿城", "掘地", "释放", "纵逃", "追赶", "固守"],
    "壬": ["佯败", "野桃", "施惠", "赦宥", "先动", "后举", "掩袭", "用人"],
    "癸": ["擒缚", "决水", "魇魅", "假托", "蛊惑", "耀武", "济渡", "绝粮"]
};

// 计算十将推字
function calculateShijiangTuizi() {
    console.log("开始计算十将推字");
    
    try {
        // 获取机锋门
        const jifengResult = calculateJifengMen();
        if (!jifengResult) {
            console.error("无法计算机锋门，无法计算十将推字");
            return null;
        }
        
        // 获取机锋门天盘和地盘
        const tianpan = jifengResult.tianpan;
        const dipan = jifengResult.dipan;
        
        // 提取地支部分
        const tianpanDizhi = extractDizhi(tianpan);
        console.log(`机锋门: 天盘=${tianpan}(地支=${tianpanDizhi}), 地盘=${dipan}`);
        
        // 从天盘获取天干部分
        const tianpanTiangan = tianpan.length > 1 ? tianpan.charAt(0) : null;
        if (!tianpanTiangan) {
            console.error("天盘没有天干部分，无法计算十将推字");
            return null;
        }
        console.log(`天盘天干: ${tianpanTiangan}`);
        
        // 在当前表格中查找地盘地支对应的天干
        const dipanTiangan = findTianganForDizhi(dipan);
        if (!dipanTiangan) {
            console.error(`找不到地盘${dipan}对应的天干`);
            return null;
        }
        console.log(`地盘${dipan}对应的天干: ${dipanTiangan}`);
        
        // 计算从天盘天干到地盘天干的步数
        const tianganIndex = tiangan.indexOf(tianpanTiangan);
        const targetTianganIndex = tiangan.indexOf(dipanTiangan);
        
        if (tianganIndex === -1 || targetTianganIndex === -1) {
            console.error(`无效的天干: ${tianpanTiangan} 或 ${dipanTiangan}`);
            return null;
        }
        
        // 从天盘天干开始数，计算需要几步才能到地盘天干
        let steps = 0;
        let currentIndex = tianganIndex;
        while (currentIndex !== targetTianganIndex) {
            currentIndex = (currentIndex + 1) % 10; // 天干一共10个
            steps++;
            
            // 防止无限循环
            if (steps > 10) {
                console.error("计算步数时出现错误");
                return null;
            }
        }
        
        console.log(`从${tianpanTiangan}到${dipanTiangan}需要${steps}步`);
        
        // 获取推字
        const tuiziList = tianganTuiziMap[tianpanTiangan];
        if (!tuiziList || tuiziList.length === 0) {
            console.error(`找不到天干${tianpanTiangan}对应的推字列表`);
            return null;
        }
        
        // 计算推字索引，如果步数为0，则使用第一个
        const tuiziIndex = steps === 0 ? 0 : (steps - 1) % tuiziList.length;
        const tuizi = tuiziList[tuiziIndex];
        
        console.log(`十将推字: ${tianpanTiangan}->${dipanTiangan}(${steps}步) -> ${tuizi}`);
        
        return {
            tianganSource: tianpanTiangan,
            tianganTarget: dipanTiangan,
            steps: steps,
            tuizi: tuizi
        };
    } catch (error) {
        console.error("计算十将推字时出错:", error);
        return null;
    }
}

// 在表格中查找地支对应的天干
function findTianganForDizhi(targetDizhi) {
    console.log(`查找地支${targetDizhi}对应的天干`);
    
    try {
        // 遍历表格中所有单元格
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 4; j++) {
                const cellId = `fill-${i}-${j}`;
                const cell = document.getElementById(cellId);
                
                if (cell) {
                    // 获取单元格内容
                    const content = cell.textContent;
                    
                    // 检查地支部分是否匹配
                    const dizhi = content.length > 1 ? content.charAt(content.length - 1) : content;
                    
                    if (dizhi === targetDizhi) {
                        // 获取天干部分
                        const tiangan = content.length > 1 ? content.charAt(0) : null;
                        console.log(`在单元格${cellId}找到地支${targetDizhi}对应的天干: ${tiangan}`);
                        return tiangan;
                    }
                }
            }
        }
        
        console.error(`在表格中找不到地支${targetDizhi}对应的天干`);
        return null;
    } catch (error) {
        console.error(`查找地支${targetDizhi}对应的天干时出错:`, error);
        return null;
    }
}

// 更新十将信息
function updateShijiangInfo() {
    console.log("更新十将信息");
    
    try {
        // 获取十将卡片元素
        const shijiangCard = document.getElementById('shijian-card');
        const sourceElement = document.getElementById('shijian-tiangan-source');
        const targetElement = document.getElementById('shijian-tiangan-target');
        const resultElement = document.getElementById('shijian-result');
        const explainElement = document.getElementById('shijian-explain');
        
        if (!shijiangCard || !sourceElement || !targetElement || !resultElement || !explainElement) {
            console.error("未找到十将卡片元素");
            return;
        }
        
        // 计算十将推字
        const shijiangResult = calculateShijiangTuizi();
        
        // 如果无法计算十将推字，隐藏卡片
        if (!shijiangResult || !shijiangResult.tuizi) {
            shijiangCard.style.display = 'none';
            console.log("无法计算十将推字，隐藏卡片");
            return;
        }
        
        // 更新十将卡片显示
        sourceElement.textContent = shijiangResult.tianganSource;
        targetElement.textContent = shijiangResult.tianganTarget;
        resultElement.textContent = shijiangResult.tuizi;
        
        // 计算步数说明
        let stepsExplain = `${shijiangResult.tianganSource}→`;
        
        let currentIndex = tiangan.indexOf(shijiangResult.tianganSource);
        for (let i = 1; i <= shijiangResult.steps; i++) {
            currentIndex = (currentIndex + 1) % 10; // 天干一共10个
            if (i < shijiangResult.steps) {
                stepsExplain += `${tiangan[currentIndex]}→`;
            } else {
                stepsExplain += `${tiangan[currentIndex]}`;
            }
        }
        
        explainElement.textContent = `步数计算: ${stepsExplain} (${shijiangResult.steps}步)`;
        
        // 显示卡片
        shijiangCard.style.display = 'block';
        
        console.log("十将信息更新完成");
    } catch (error) {
        console.error("更新十将信息时出错:", error);
    }
}

// 定义十二地支的刑冲合害关系
const dizhiRelations = {
    "子": { "刑": "卯", "冲": "午", "合": "丑", "害": "未" },
    "丑": { "刑": "戌", "冲": "未", "合": "子", "害": "午" },
    "寅": { "刑": "巳", "冲": "申", "合": "亥", "害": "酉" },
    "卯": { "刑": "子", "冲": "酉", "合": "戌", "害": "申" },
    "辰": { "刑": "辰", "冲": "戌", "合": "酉", "害": "亥" },
    "巳": { "刑": "寅", "冲": "亥", "合": "申", "害": "子" },
    "午": { "刑": "午", "冲": "子", "合": "未", "害": "丑" },
    "未": { "刑": "申", "冲": "丑", "合": "午", "害": "子" },
    "申": { "刑": "未", "冲": "寅", "合": "巳", "害": "卯" },
    "酉": { "刑": "酉", "冲": "卯", "合": "辰", "害": "寅" },
    "戌": { "刑": "丑", "冲": "辰", "合": "卯", "害": "巳" },
    "亥": { "刑": "亥", "冲": "巳", "合": "寅", "害": "辰" }
};

// 更新用神分析卡片
function updateYongshenCard(yongshen) {
    console.log(`更新用神分析卡片: ${yongshen}`);
    
    try {
        // 获取卡片元素
        const yongshenCard = document.getElementById('yongshen-card');
        const yongshenInfo = document.getElementById('yongshen-info');
        const yongshenRelations = document.getElementById('yongshen-relations');
        const yongshenAnalysis = document.getElementById('yongshen-analysis');
        
        // 如果卡片元素不存在，可能是我们没有创建这些元素，直接返回不执行后续代码
        if (!yongshenCard || !yongshenInfo || !yongshenRelations || !yongshenAnalysis) {
            console.log("用神分析卡片元素不存在，跳过更新");
            return;
        }
        
        // 更新用神信息
        yongshenInfo.textContent = yongshen;
        
        // 获取用神的刑冲合害关系
        const relations = dizhiRelations[yongshen];
        if (relations) {
            const relationsText = `刑${relations.刑}、冲${relations.冲}、合${relations.合}、害${relations.害}`;
            yongshenRelations.textContent = relationsText;
            
            // 查找表格中的相关地支
            const tianpanValues = [];
            for (let i = 1; i <= 4; i++) {
                for (let j = 1; j <= 4; j++) {
                    const cellId = `fill-${i}-${j}`;
                    const cell = document.getElementById(cellId);
                    
                    if (cell && cell.textContent) {
                        // 提取地支部分
                        const dizhi = extractDizhi(cell.textContent);
                        if (dizhi) {
                            tianpanValues.push(dizhi);
                        }
                    }
                }
            }
            
            // 分析用神与天盘中其他地支的关系
            let analysisText = `用神${yongshen}`;
            const relationFound = [];
            
            if (tianpanValues.includes(relations.刑)) {
                relationFound.push(`与天盘中的${relations.刑}相刑`);
            }
            if (tianpanValues.includes(relations.冲)) {
                relationFound.push(`与天盘中的${relations.冲}相冲`);
            }
            if (tianpanValues.includes(relations.合)) {
                relationFound.push(`与天盘中的${relations.合}相合`);
            }
            if (tianpanValues.includes(relations.害)) {
                relationFound.push(`与天盘中的${relations.害}相害`);
            }
            
            if (relationFound.length > 0) {
                analysisText += relationFound.join("，") + "。";
            } else {
                analysisText += "在天盘中没有相刑、相冲、相合、相害的地支。";
            }
            
            yongshenAnalysis.textContent = analysisText;
        } else {
            yongshenRelations.textContent = "--";
            yongshenAnalysis.textContent = "无法获取用神关系信息。";
        }
        
        // 显示卡片
        yongshenCard.style.display = 'block';
        
        console.log("用神分析卡片更新完成");
    } catch (error) {
        console.error("更新用神分析卡片时出错:", error);
    }
}

// 更新嵌入式十将信息
function updateInlineShijiang() {
    console.log("更新嵌入式十将信息");
    
    try {
        // 获取嵌入式十将元素
        const sourceElement = document.getElementById('shijian-inline-source');
        const targetElement = document.getElementById('shijian-inline-target');
        const resultElement = document.getElementById('shijian-inline-result');
        
        if (!sourceElement || !targetElement || !resultElement) {
            console.error("未找到嵌入式十将元素");
            return;
        }
        
        // 计算十将推字
        const shijiangResult = calculateShijiangTuizi();
        
        // 如果无法计算十将推字，显示默认值
        if (!shijiangResult || !shijiangResult.tuizi) {
            sourceElement.textContent = "--";
            targetElement.textContent = "--";
            resultElement.textContent = "无法计算";
            console.log("无法计算十将推字");
            return;
        }
        
        // 更新嵌入式十将显示
        sourceElement.textContent = shijiangResult.tianganSource;
        targetElement.textContent = shijiangResult.tianganTarget;
        resultElement.textContent = shijiangResult.tuizi;
        
        console.log("嵌入式十将信息更新完成");
    } catch (error) {
        console.error("更新嵌入式十将信息时出错:", error);
    }
}

// 修改用神计算事件监听器
document.addEventListener('DOMContentLoaded', function() {
    // 用神选择
    const yongshenBtn = document.getElementById('yongshen-btn');
    if (yongshenBtn) {
        yongshenBtn.addEventListener('click', function() {
            const yongshenSelect = document.getElementById('yongshen-select');
            const selectedYongShen = yongshenSelect.value;
            
            if (selectedYongShen) {
                calculateYongShen();
                // 注释掉这行，因为对应的HTML元素可能不存在
                // updateYongshenCard(selectedYongShen);
            } else {
                alert("请先选择用神");
            }
        });
    } else {
        console.warn("未找到用神按钮");
    }
});

// 更新固定卡片信息（机锋门、十将）
function updateFixedCards() {
    console.log("更新固定卡片信息");
    
    try {
        // 更新机锋门卡片
        updateJifengMenCard();
        
        // 更新十将卡片
        updateShijiangCard();
        
        console.log("固定卡片信息更新完成");
    } catch (error) {
        console.error("更新固定卡片信息时出错:", error);
    }
}

// 更新机锋门卡片
function updateJifengMenCard() {
    console.log("更新机锋门卡片");
    
    try {
        // 计算机锋门
        const jifengResult = calculateJifengMen();
        if (!jifengResult) {
            console.error("无法计算机锋门");
            return;
        }
        
        // 获取机锋门卡片元素
        const tianpanElement = document.getElementById('jifeng-tianpan-display');
        const dipanElement = document.getElementById('jifeng-dipan-display');
        const tianpanStarElement = document.getElementById('jifeng-tianpan-star');
        const dipanStarElement = document.getElementById('jifeng-dipan-star');
        const resultElement = document.getElementById('jifeng-result-display');
        
        if (!tianpanElement || !dipanElement || !tianpanStarElement || !dipanStarElement || !resultElement) {
            console.error("未找到机锋门卡片元素");
            return;
        }
        
        // 获取天盘地支对应的星司
        const tianpanDizhi = extractDizhi(jifengResult.tianpan);
        
        console.log(`机锋门天盘原值: ${jifengResult.tianpan}`);
        console.log(`机锋门天盘地支: ${tianpanDizhi}`);
        
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        const tianpanXingsi = getXingsiForDiZhi(tianpanDizhi);
        const dipanXingsi = getXingsiForDiZhi(jifengResult.dipan);
        
        // 计算推字
        const tuiziResult = calculateTuizi();
        
        // 强制直接使用地支，不使用tianpanDizhi变量
        tianpanElement.textContent = jifengResult.tianpan.charAt(jifengResult.tianpan.length - 1);
        dipanElement.textContent = jifengResult.dipan;
        
        tianpanStarElement.textContent = tianpanXingsi ? tianpanXingsi.star : "--";
        dipanStarElement.textContent = dipanXingsi ? dipanXingsi.star : "--";
        
        if (tuiziResult && tuiziResult.tuiziList && tuiziResult.tuiziIndex !== undefined) {
            resultElement.textContent = tuiziResult.tuiziList[tuiziResult.tuiziIndex] || "无法推字";
        } else {
            resultElement.textContent = "无法推字";
        }
        
        console.log("机锋门卡片更新完成");
    } catch (error) {
        console.error("更新机锋门卡片时出错:", error);
    }
}

// 更新十将卡片
function updateShijiangCard() {
    console.log("更新十将卡片");
    
    try {
        // 获取十将卡片元素
        const sourceElement = document.getElementById('shijian-source-display');
        const targetElement = document.getElementById('shijian-target-display');
        const resultElement = document.getElementById('shijian-result-display');
        const explainElement = document.getElementById('shijian-explain-display');
        
        if (!sourceElement || !targetElement || !resultElement || !explainElement) {
            console.error("未找到十将卡片元素");
            return;
        }
        
        // 计算十将推字
        const shijiangResult = calculateShijiangTuizi();
        
        // 如果无法计算十将推字，显示默认值
        if (!shijiangResult || !shijiangResult.tuizi) {
            sourceElement.textContent = "--";
            targetElement.textContent = "--";
            resultElement.textContent = "无法计算";
            explainElement.textContent = "--";
            console.log("无法计算十将推字");
            return;
        }
        
        // 更新十将卡片显示
        sourceElement.textContent = shijiangResult.tianganSource;
        targetElement.textContent = shijiangResult.tianganTarget;
        resultElement.textContent = shijiangResult.tuizi;
        
        // 计算步数说明
        let stepsExplain = `${shijiangResult.tianganSource}→`;
        
        let currentIndex = tiangan.indexOf(shijiangResult.tianganSource);
        for (let i = 1; i <= shijiangResult.steps; i++) {
            currentIndex = (currentIndex + 1) % 10; // 天干一共10个
            if (i < shijiangResult.steps) {
                stepsExplain += `${tiangan[currentIndex]}→`;
            } else {
                stepsExplain += `${tiangan[currentIndex]}`;
            }
        }
        
        explainElement.textContent = `步数计算: ${stepsExplain} (${shijiangResult.steps}步)`;
        
        console.log("十将卡片更新完成");
    } catch (error) {
        console.error("更新十将卡片时出错:", error);
    }
}





// 在表格中查找地盘对应的天盘值
function findTianpanValueForDipan(targetDipan) {
    console.log(`查找地盘${targetDipan}对应的天盘值`);
    
    try {
        // 遍历表格中所有单元格
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 4; j++) {
                const cellId = `fill-${i}-${j}`;
                const cell = document.getElementById(cellId);
                
                if (cell) {
                    // 获取单元格内容（天盘值）
                    const tianpan = cell.textContent;
                    
                    // 获取地盘值
                    const dizhiCell = cell.closest('td').querySelector('.dz-label');
                    if (dizhiCell && dizhiCell.textContent === targetDipan) {
                        console.log(`在单元格${cellId}找到地盘${targetDipan}对应的天盘值: ${tianpan}`);
                        return tianpan;  // 返回完整天盘值（包含天干地支）
                    }
                }
            }
        }
        
        console.error(`在表格中找不到地盘${targetDipan}对应的天盘值`);
        return null;
    } catch (error) {
        console.error(`查找地盘${targetDipan}对应的天盘值时出错:`, error);
        return null;
    }
}

// 在updateTable函数末尾添加对updateFixedCards的调用
// 更新推字信息
console.log("开始更新固定卡片信息...");
updateFixedCards();  // 添加对updateFixedCards的调用

// updateTuiziInfo();  // 移除自动调用updateTuiziInfo

// 显示三层盘
function showSancengpan(tianpanMap) {
    console.log("显示三层盘...");
    
    // 获取容器元素
    const container = document.getElementById("sancengpan-container");
    if (!container) {
        console.error("未找到三层盘容器元素");
            return;
        }
        
    // 切换显示状态
    if (container.style.display === "none") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
            return;
        }
        
    // 获取用神选择
    const yongshenSelect = document.getElementById("yongshen-select");
    if (!yongshenSelect || !yongshenSelect.value) {
        container.innerHTML = `<div class="alert alert-warning">请先选择用神</div>`;
        return;
    }
    
    const selectedYongShen = yongshenSelect.value;
    console.log(`三层盘用神: ${selectedYongShen}`);
    
    // 定义地盘布局
    const dipanLayout = [
        ["巳", "午", "未", "申"],
        ["辰", "空", "空", "酉"],
        ["卯", "空", "空", "戌"],
        ["寅", "丑", "子", "亥"]
    ];
    
    // 先计算二层盘的相关信息
    // 查找天机的天盘值和地机宫位
    const tianjiTianpan = tianpanMap[selectedYongShen];
    if (!tianjiTianpan || tianjiTianpan === "无") {
        console.error("天机的天盘无效");
        container.innerHTML = `<div class="alert alert-warning">天机的天盘无效</div>`;
        return;
    }
    const tianpanDizhi = extractDizhi(tianjiTianpan);
    
    // 计算地机宫位
    const dijiGong = getOppositeGong(selectedYongShen);
    
    console.log(`用神: ${selectedYongShen}, 天机的天盘: ${tianpanDizhi}, 地机宫位: ${dijiGong}`);
    
    // 创建天盘排列
    const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    
    // 找到天机天盘在branches中的索引
    const tianpanDizhiIndex = branches.indexOf(tianpanDizhi);
    if (tianpanDizhiIndex === -1) {
        console.error(`天机天盘 ${tianpanDizhi} 不是有效的地支`);
        container.innerHTML = `<div class="alert alert-warning">无法计算三层盘：天机天盘 ${tianpanDizhi} 不是有效的地支</div>`;
        return;
    }
    
    // 找到地机宫位在branches中的索引
    const dijiGongIndex = branches.indexOf(dijiGong);
    if (dijiGongIndex === -1) {
        console.error(`地机宫位 ${dijiGong} 不是有效的地支`);
        container.innerHTML = `<div class="alert alert-warning">无法计算三层盘：地机宫位 ${dijiGong} 不是有效的地支</div>`;
        return;
    }
    
    // 创建二层盘映射（地盘->天盘）
    const ercengPanMap = {};
    
    // 首先，将天机的天盘放在地机的地盘位置上
    ercengPanMap[dijiGong] = tianpanDizhi;
    
    // 然后从天盘地支开始，逆时针排列其余天盘
    for (let i = 1; i < 12; i++) {
        // 计算地支在地盘中的位置（逆时针+1）
        const dipanIndex = (dijiGongIndex + i) % 12;
        const dipanBranch = branches[dipanIndex];
        
        // 计算对应的天盘值（逆时针+1）
        const tianpanIndex = (tianpanDizhiIndex + i) % 12;
        const tianpanValue = branches[tianpanIndex];
        
        // 设置地盘到天盘的映射
        ercengPanMap[dipanBranch] = tianpanValue;
    }
    
    // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
    // 计算二层盘的人气和天气
    // 获取下拉框选择的天盘或当前刻值
    const renqiTianpanSelect = document.getElementById('tianpan');
    let renqiSelectedValue = "";
    
    if (renqiTianpanSelect && renqiTianpanSelect.value && renqiTianpanSelect.value !== "无") {
        // 如果天盘下拉框有选择值，则使用该值
        renqiSelectedValue = renqiTianpanSelect.value;
        console.log(`使用天盘下拉框选择的值(人气): ${renqiSelectedValue}`);
    } else {
        // 如果天盘下拉框未选择或选择了"无"，则使用当前时间计算的刻值
        const currentKe = getCurrentKe();
        renqiSelectedValue = currentKe;
        console.log(`使用当前刻(人气): ${renqiSelectedValue}`);
    }
    
    // 提取地支部分（如果包含天干）
    const renqiSelectedDizhi = extractDizhi(renqiSelectedValue);
    console.log(`人气选择的地支: ${renqiSelectedDizhi}`);
    
    // 在二层盘中找天盘为所选地支的地盘位置
    let renqiDipan = null;
    for (const [dipan, tianpan] of Object.entries(ercengPanMap)) {
        if (tianpan === renqiSelectedDizhi) {
            renqiDipan = dipan;
            break;
        }
    }
    
    if (!renqiDipan) {
        console.error(`在二层盘中未找到天盘为${renqiSelectedDizhi}的地盘位置`);
        renqiDipan = dijiGong; // 如果找不到，使用默认的地机宫位作为地盘
    }
    
    const renqiTianpan = renqiSelectedDizhi; // 选择的天盘值
    
    // 天气 = 地盘为用神 + 用神对应的天盘
    // 用神作为地盘
    const tianqiDipan = selectedYongShen;
    
    // 找到地盘为用神对应的天盘值
    const tianqiTianpan = ercengPanMap[selectedYongShen] || "无";
    
    // 如果找不到用神地盘对应的天盘
    if (tianqiTianpan === "无") {
        console.error(`在二层盘中未找到地盘${selectedYongShen}对应的天盘`);
    }
    
    console.log(`二层盘人气：天盘=${renqiTianpan}, 地盘=${renqiDipan}`);
    console.log(`二层盘天气：天盘=${tianqiTianpan}, 地盘=${tianqiDipan}`);
    
    // 创建三层盘映射（地盘->天盘）
    // 三层盘的天盘：第二层盘的天气的天盘(tianqiTianpan)加在第二层盘的人气的地盘(renqiDipan)上
    const sancengPanMap = {};
    
    // 首先，将天气的天盘放在人气的地盘位置上
    sancengPanMap[renqiDipan] = tianqiTianpan;
    console.log(`三层盘：将二层盘天气的天盘${tianqiTianpan}放在二层盘人气的地盘${renqiDipan}位置上`);
    
    // 天气天盘位置索引
    const tianqiTianpanIndex = branches.indexOf(tianqiTianpan);
    // 人气地盘位置索引
    const renqiDipanIndex = branches.indexOf(renqiDipan);
    
    // 然后从天气天盘开始，按照小阴符规则真正的逆时针排列其余天盘
    for (let i = 1; i < 12; i++) {
        // 计算地支在地盘中的位置（正向顺序+i）
        const dipanIndex = (renqiDipanIndex + i) % 12;
        const dipanBranch = branches[dipanIndex];
        
        // 从起点天盘索引开始，减去偏移量（因为是逆时针）
        // 使用与第一层盘相同的逆时针逻辑
        const tianpanIndex = (tianqiTianpanIndex - i + 12) % 12;
        const tianpanValue = branches[tianpanIndex];
        
        // 设置地盘到天盘的映射
        sancengPanMap[dipanBranch] = tianpanValue;
        console.log(`三层盘：地盘 ${dipanBranch} -> 天盘 ${tianpanValue}`);
    }
    
    // 创建三层盘表格
    let tableHtml = `
    <div class="mb-3 alert alert-info">
        三层盘：二层盘天气的天盘${tianqiTianpan}放在二层盘人气的地盘${renqiDipan}位置上，然后<strong>逆时针</strong>排列
    </div>
    <div class="table-responsive">
        <table class="table table-bordered text-center sancengpan-table">
    `;
    
    for (let row = 0; row < 4; row++) {
        tableHtml += '<tr>';
        
        for (let col = 0; col < 4; col++) {
            const dizhiValue = dipanLayout[row][col];
            
            if (dizhiValue === "空") {
                if (row === 1 && col === 1) {
                    tableHtml += '<td colspan="2" rowspan="2" class="center-cell bg-light">';
                    tableHtml += '<div class="center-text">三层盘</div>';
                    tableHtml += '</td>';
                }
            } else {
                // 获取这个地支对应的天盘值
                const tianpanValue = sancengPanMap[dizhiValue] || "无";
                
                // 突出显示天气的天盘放在人气地盘的位置
                let specialClass = "";
                if (dizhiValue === renqiDipan && tianpanValue === tianqiTianpan) {
                    specialClass = "bg-primary text-white"; // 天气天盘放在人气地盘的位置
                }
                
                tableHtml += `<td class="position-relative ${specialClass}">`;
                tableHtml += `<div class="tp-label">${tianpanValue}</div>`;
                tableHtml += `<div class="dz-label">${dizhiValue}</div>`;
                tableHtml += '</td>';
            }
        }
        
        tableHtml += '</tr>';
    }
    
    tableHtml += '</table></div>';
    tableHtml += '<div class="small text-muted mt-2">注：蓝色背景表示二层盘天气的天盘放在二层盘人气的地盘位置上，天盘按<strong>逆时针</strong>方向排列</div>';
    
    // 获取占卜类型（他占/自占）
    const taZhanRadio = document.getElementById("taZhan");
    const isForOthers = taZhanRadio && taZhanRadio.checked;
    const zhanType = isForOthers ? "他占" : "自占";
    
    // 计算天地盗相关信息
    console.log("计算天地盗...");
    const tiandiDaoTianpan = tianqiTianpan;  // 二层盘天气的天盘
    const tiandiDaoDipan = renqiDipan;       // 二层盘人气的地盘
    
    // 计算天地盗天盘星司
    const tiandiDaoTianpanPart = getBranchPartByTime(tiandiDaoTianpan, hour, minute);
    const tiandiDaoTianpanKey = `${tiandiDaoTianpan}-${tiandiDaoTianpanPart}`;
    const tiandiDaoTianpanStar = xingsiNames[tiandiDaoTianpanKey];
    const tiandiDaoTianpanStarNumber = xingsiNumberMap[tiandiDaoTianpanStar] || 0;
    console.log(`天地盗天盘星司: ${tiandiDaoTianpanStar}(${tiandiDaoTianpanStarNumber})`);
    
    // 计算天地盗地盘星司
    const tiandiDaoDipanPart = getBranchPartByTime(tiandiDaoDipan, hour, minute);
    const tiandiDaoDipanKey = `${tiandiDaoDipan}-${tiandiDaoDipanPart}`;
    const tiandiDaoDipanStar = xingsiNames[tiandiDaoDipanKey];
    const tiandiDaoDipanStarNumber = xingsiNumberMap[tiandiDaoDipanStar] || 0;
    console.log(`天地盗地盘星司: ${tiandiDaoDipanStar}(${tiandiDaoDipanStarNumber})`);
    
    // 计算天地盗推字结果
    const tiandiDaoResult = calculateTuiziForYongShen(tiandiDaoTianpanStar, tiandiDaoDipanStarNumber);
    console.log(`天地盗推字结果: ${tiandiDaoResult}`);
    
    // 计算万物盗相关信息
    console.log("计算万物盗...");
    // 万物盗 = 天地盗的对宫
    const wanwuDaoDipan = getOppositeGong(tiandiDaoDipan);
    console.log(`万物盗地盘: ${wanwuDaoDipan} (天地盗地盘${tiandiDaoDipan}的对冲宫)`);
    
    // 找到万物盗地盘对应的天盘（在三层盘中）
    const wanwuDaoTianpan = sancengPanMap[wanwuDaoDipan];
    console.log(`万物盗天盘: ${wanwuDaoTianpan}`);
    
    // 计算万物盗天盘星司
    const wanwuDaoTianpanPart = getBranchPartByTime(wanwuDaoTianpan, hour, minute);
    const wanwuDaoTianpanKey = `${wanwuDaoTianpan}-${wanwuDaoTianpanPart}`;
    const wanwuDaoTianpanStar = xingsiNames[wanwuDaoTianpanKey];
    const wanwuDaoTianpanStarNumber = xingsiNumberMap[wanwuDaoTianpanStar] || 0;
    console.log(`万物盗天盘星司: ${wanwuDaoTianpanStar}(${wanwuDaoTianpanStarNumber})`);
    
    // 计算万物盗地盘星司
    const wanwuDaoDipanPart = getBranchPartByTime(wanwuDaoDipan, hour, minute);
    const wanwuDaoDipanKey = `${wanwuDaoDipan}-${wanwuDaoDipanPart}`;
    const wanwuDaoDipanStar = xingsiNames[wanwuDaoDipanKey];
    const wanwuDaoDipanStarNumber = xingsiNumberMap[wanwuDaoDipanStar] || 0;
    console.log(`万物盗地盘星司: ${wanwuDaoDipanStar}(${wanwuDaoDipanStarNumber})`);
    
    // 计算万物盗推字结果
    const wanwuDaoResult = calculateTuiziForYongShen(wanwuDaoTianpanStar, wanwuDaoDipanStarNumber);
    console.log(`万物盗推字结果: ${wanwuDaoResult}`);
    
    // 计算人盗相关信息
    console.log("计算人盗...");
    // 获取最初下拉框选择的天盘
    const renDaoTianpanSelect = document.getElementById('tianpan');
    let initialTianpan = "";
    
    if (renDaoTianpanSelect && renDaoTianpanSelect.value && renDaoTianpanSelect.value !== "无") {
        // 使用下拉框选择的值
        initialTianpan = renDaoTianpanSelect.value;
        console.log(`使用下拉框选择的天盘值: ${initialTianpan}`);
                    } else {
        // 使用当前时间计算的天盘值
        const currentKe = getCurrentKe();
        initialTianpan = currentKe;
        console.log(`使用当前时间计算的天盘值: ${initialTianpan}`);
    }
    
    // 查找该天盘在三层盘中的地盘位置
    let renDaoDipan = null;
    for (const [dipan, tianpan] of Object.entries(sancengPanMap)) {
        if (tianpan === initialTianpan) {
            renDaoDipan = dipan;
            break;
        }
    }
    
    // 如果找不到位置
    if (!renDaoDipan) {
        console.error(`在三层盘中未找到天盘为${initialTianpan}的地盘位置`);
        renDaoDipan = "未知";
    }
    
    const renDaoTianpan = initialTianpan;
    console.log(`人盗: 天盘=${renDaoTianpan}, 地盘=${renDaoDipan}`);
    
    // 计算人盗天盘星司
    const renDaoTianpanPart = getBranchPartByTime(renDaoTianpan, hour, minute);
    const renDaoTianpanKey = `${renDaoTianpan}-${renDaoTianpanPart}`;
    const renDaoTianpanStar = xingsiNames[renDaoTianpanKey];
    const renDaoTianpanStarNumber = xingsiNumberMap[renDaoTianpanStar] || 0;
    console.log(`人盗天盘星司: ${renDaoTianpanStar}(${renDaoTianpanStarNumber})`);
    
    // 计算人盗地盘星司
    const renDaoDipanPart = getBranchPartByTime(renDaoDipan, hour, minute);
    const renDaoDipanKey = `${renDaoDipan}-${renDaoDipanPart}`;
    const renDaoDipanStar = xingsiNames[renDaoDipanKey];
    const renDaoDipanStarNumber = xingsiNumberMap[renDaoDipanStar] || 0;
    console.log(`人盗地盘星司: ${renDaoDipanStar}(${renDaoDipanStarNumber})`);
    
    // 计算人盗推字结果
    const renDaoResult = calculateTuiziForYongShen(renDaoTianpanStar, renDaoDipanStarNumber);
    console.log(`人盗推字结果: ${renDaoResult}`);
    
    // 计算三层盘的机锋
    console.log("计算三层盘的机锋...");
    // 获取初始天盘（下拉框选择的）
    const initialTianpanDizhi = extractDizhi(initialTianpan);
    
    // 计算六合地支
    const liuHeDizhi = liuheMap[initialTianpanDizhi];
    if (!liuHeDizhi) {
        console.error(`找不到地支${initialTianpanDizhi}的六合关系`);
    }
    
    // 机锋: 找到地盘为六合地支的宫位
    const sancengJifengDipan = liuHeDizhi;  // 地盘就是六合地支
    const sancengJifengTianpan = sancengPanMap[sancengJifengDipan] || "无"; // 查找该地盘对应的天盘
    
    console.log(`三层盘机锋: 找到地盘为${liuHeDizhi}的宫位，天盘=${sancengJifengTianpan}`);
    
    // 计算星司
    const sancengJifengTianpanPart = getBranchPartByTime(sancengJifengTianpan, hour, minute);
    const sancengJifengTianpanKey = `${sancengJifengTianpan}-${sancengJifengTianpanPart}`;
    const sancengJifengTianpanStar = xingsiNames[sancengJifengTianpanKey];
    
    const sancengJifengDipanPart = getBranchPartByTime(sancengJifengDipan, hour, minute);
    const sancengJifengDipanKey = `${sancengJifengDipan}-${sancengJifengDipanPart}`;
    const sancengJifengDipanStar = xingsiNames[sancengJifengDipanKey];
    
    // 计算推字
    const sancengJifengDipanStarNumber = xingsiNumberMap[sancengJifengDipanStar] || 0;
    const sancengJifengResult = calculateTuiziForYongShen(sancengJifengTianpanStar, sancengJifengDipanStarNumber);
    
    // 计算十贼
    console.log("计算十贼...");
    
    // 以天地盗为核心
    const tiandiDaoDipanIndex = getBranchIndex(tiandiDaoDipan);
    console.log(`天地盗地盘索引: ${tiandiDaoDipanIndex}`);
    
    // 计算天命贼：顺时针下一个宫位的地盘
    const tianmingZeIndex = (tiandiDaoDipanIndex + 1) % 12;
    const tianmingZeDipan = getBranchByIndex(tianmingZeIndex);
    const tianmingZeTianpan = sancengPanMap[tianmingZeDipan];
    console.log(`天命贼: 天盘=${tianmingZeTianpan}, 地盘=${tianmingZeDipan}`);
    
    // 计算天物贼：逆时针下两个宫位的地盘
    const tianwuZeIndex = (tiandiDaoDipanIndex - 2 + 12) % 12;
    const tianwuZeDipan = getBranchByIndex(tianwuZeIndex);
    const tianwuZeTianpan = sancengPanMap[tianwuZeDipan];
    console.log(`天物贼: 天盘=${tianwuZeTianpan}, 地盘=${tianwuZeDipan}`);
    
    // 计算天时贼：顺时针下三个宫位的地盘
    const tianshiZeIndex = (tiandiDaoDipanIndex + 3) % 12;
    const tianshiZeDipan = getBranchByIndex(tianshiZeIndex);
    const tianshiZeTianpan = sancengPanMap[tianshiZeDipan];
    console.log(`天时贼: 天盘=${tianshiZeTianpan}, 地盘=${tianshiZeDipan}`);
    
    // 计算天功贼：逆时针下四个宫位的地盘
    const tiangongZeIndex = (tiandiDaoDipanIndex - 4 + 12) % 12;
    const tiangongZeDipan = getBranchByIndex(tiangongZeIndex);
    const tiangongZeTianpan = sancengPanMap[tiangongZeDipan];
    console.log(`天功贼: 天盘=${tiangongZeTianpan}, 地盘=${tiangongZeDipan}`);
    
    // 计算天神贼：顺时针下五个宫位的地盘
    const tianshenZeIndex = (tiandiDaoDipanIndex + 5) % 12;
    const tianshenZeDipan = getBranchByIndex(tianshenZeIndex);
    const tianshenZeTianpan = sancengPanMap[tianshenZeDipan];
    console.log(`天神贼: 天盘=${tianshenZeTianpan}, 地盘=${tianshenZeDipan}`);
    
    // 计算地命贼：顺时针下六个宫位的天盘
    const dimingZeIndex = (tiandiDaoDipanIndex + 6) % 12;
    const dimingZeDipan = getBranchByIndex(dimingZeIndex);
    const dimingZeTianpan = sancengPanMap[dimingZeDipan];
    console.log(`地命贼: 天盘=${dimingZeTianpan}, 地盘=${dimingZeDipan}`);
    
    // 计算地物贼：逆时针下七个宫位的天盘
    const diwuZeIndex = (tiandiDaoDipanIndex - 7 + 12) % 12;
    const diwuZeDipan = getBranchByIndex(diwuZeIndex);
    const diwuZeTianpan = sancengPanMap[diwuZeDipan];
    console.log(`地物贼: 天盘=${diwuZeTianpan}, 地盘=${diwuZeDipan}`);
    
    // 计算地时贼：顺时针下八个宫位的天盘
    const dishiZeIndex = (tiandiDaoDipanIndex + 8) % 12;
    const dishiZeDipan = getBranchByIndex(dishiZeIndex);
    const dishiZeTianpan = sancengPanMap[dishiZeDipan];
    console.log(`地时贼: 天盘=${dishiZeTianpan}, 地盘=${dishiZeDipan}`);
    
    // 计算地功贼：逆时针下九个宫位的天盘
    const digongZeIndex = (tiandiDaoDipanIndex - 9 + 12) % 12;
    const digongZeDipan = getBranchByIndex(digongZeIndex);
    const digongZeTianpan = sancengPanMap[digongZeDipan];
    console.log(`地功贼: 天盘=${digongZeTianpan}, 地盘=${digongZeDipan}`);
    
    // 计算地神贼：顺时针下十个宫位的天盘
    const dishenZeIndex = (tiandiDaoDipanIndex + 10) % 12;
    const dishenZeDipan = getBranchByIndex(dishenZeIndex);
    const dishenZeTianpan = sancengPanMap[dishenZeDipan];
    console.log(`地神贼: 天盘=${dishenZeTianpan}, 地盘=${dishenZeDipan}`);
    
    // 计算星司和推字
    function calculateStarAndTuizi(tianpan, dipan) {
        // 计算天盘星司
        const tianpanPart = getBranchPartByTime(tianpan, hour, minute);
        const tianpanKey = `${tianpan}-${tianpanPart}`;
        const tianpanStar = xingsiNames[tianpanKey];
        const tianpanStarNumber = xingsiNumberMap[tianpanStar] || 0;
        
        // 计算地盘星司
        const dipanPart = getBranchPartByTime(dipan, hour, minute);
        const dipanKey = `${dipan}-${dipanPart}`;
        const dipanStar = xingsiNames[dipanKey];
        const dipanStarNumber = xingsiNumberMap[dipanStar] || 0;
        
        // 计算推字结果
        const tuiziResult = calculateTuiziForYongShen(tianpanStar, dipanStarNumber);
        
        return {
            tianpanStar,
            dipanStar,
            tuiziResult
        };
    }
    
    // 计算所有贼的星司和推字
    const tianmingZeCalc = calculateStarAndTuizi(tianmingZeTianpan, tianmingZeDipan);
    const tianwuZeCalc = calculateStarAndTuizi(tianwuZeTianpan, tianwuZeDipan);
    const tianshiZeCalc = calculateStarAndTuizi(tianshiZeTianpan, tianshiZeDipan);
    const tiangongZeCalc = calculateStarAndTuizi(tiangongZeTianpan, tiangongZeDipan);
    const tianshenZeCalc = calculateStarAndTuizi(tianshenZeTianpan, tianshenZeDipan);
    const dimingZeCalc = calculateStarAndTuizi(dimingZeTianpan, dimingZeDipan);
    const diwuZeCalc = calculateStarAndTuizi(diwuZeTianpan, diwuZeDipan);
    const dishiZeCalc = calculateStarAndTuizi(dishiZeTianpan, dishiZeDipan);
    const digongZeCalc = calculateStarAndTuizi(digongZeTianpan, digongZeDipan);
    const dishenZeCalc = calculateStarAndTuizi(dishenZeTianpan, dishenZeDipan);
    
    // 添加三个盗的卡片
    tableHtml += `
    <div class="row mt-4">
        <h4>三层盘分析</h4>
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-header bg-danger text-white">
                    天地盗
                </div>
                <div class="card-body">
                    <p>${tiandiDaoTianpan}+${tiandiDaoDipan}</p>
                    <p>${tiandiDaoTianpanStar}+${tiandiDaoDipanStar}</p>
                    <p><span class="badge bg-danger">${tiandiDaoResult}</span></p>
                    <p class="small text-muted">二层盘天气的天盘+二层盘人气的地盘</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-header bg-success text-white">
                    万物盗
                </div>
                <div class="card-body">
                    <p>${wanwuDaoTianpan}+${wanwuDaoDipan}</p>
                    <p>${wanwuDaoTianpanStar}+${wanwuDaoDipanStar}</p>
                    <p><span class="badge bg-success">${wanwuDaoResult}</span></p>
                    <p class="small text-muted">天地盗地盘的对宫</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-header bg-primary text-white">
                    人盗
                </div>
                <div class="card-body">
                    <p>${renDaoTianpan}+${renDaoDipan}</p>
                    <p>${renDaoTianpanStar}+${renDaoDipanStar}</p>
                    <p><span class="badge bg-primary">${renDaoResult}</span></p>
                    <p class="small text-muted">下拉框选择的天盘在三层盘中的位置</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 计算三层盘的机锋 -->
    <div class="row mt-4">
        <div class="col-md-12 mb-3">
            <div class="card">
                <div class="card-header bg-danger text-white">
                    三层盘机锋
                </div>
                <div class="card-body">
                    <p>${sancengJifengTianpan}+${sancengJifengDipan}</p>
                    <p>${sancengJifengTianpanStar}+${sancengJifengDipanStar}</p>
                    <p><span class="badge bg-danger">${sancengJifengResult}</span></p>
                    <p class="small text-muted">初始天盘(${initialTianpanDizhi})的六合地支(${liuHeDizhi})在三层盘中</p>
                </div>
            </div>
        </div>
    </div>
    
    <h5 class="mt-4">十贼（以天地盗为核心）</h5>
    
    <!-- 第一行五个贼 -->
    <div class="row mb-3">
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-info text-white">
                    天命贼
                </div>
                <div class="card-body">
                    <p>${tianmingZeTianpan}+${tianmingZeDipan}</p>
                    <p>${tianmingZeCalc.tianpanStar}+${tianmingZeCalc.dipanStar}</p>
                    <p><span class="badge bg-info">${tianmingZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">顺时针下一宫</p>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-info text-white">
                    天物贼
                </div>
                <div class="card-body">
                    <p>${tianwuZeTianpan}+${tianwuZeDipan}</p>
                    <p>${tianwuZeCalc.tianpanStar}+${tianwuZeCalc.dipanStar}</p>
                    <p><span class="badge bg-info">${tianwuZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">逆时针下二宫</p>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-info text-white">
                    天时贼
                </div>
                <div class="card-body">
                    <p>${tianshiZeTianpan}+${tianshiZeDipan}</p>
                    <p>${tianshiZeCalc.tianpanStar}+${tianshiZeCalc.dipanStar}</p>
                    <p><span class="badge bg-info">${tianshiZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">顺时针下三宫</p>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-info text-white">
                    天功贼
                </div>
                <div class="card-body">
                    <p>${tiangongZeTianpan}+${tiangongZeDipan}</p>
                    <p>${tiangongZeCalc.tianpanStar}+${tiangongZeCalc.dipanStar}</p>
                    <p><span class="badge bg-info">${tiangongZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">逆时针下四宫</p>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-info text-white">
                    天神贼
                </div>
                <div class="card-body">
                    <p>${tianshenZeTianpan}+${tianshenZeDipan}</p>
                    <p>${tianshenZeCalc.tianpanStar}+${tianshenZeCalc.dipanStar}</p>
                    <p><span class="badge bg-info">${tianshenZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">顺时针下五宫</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 第二行五个贼 -->
    <div class="row mb-3">
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-secondary text-white">
                    地命贼
                </div>
                <div class="card-body">
                    <p>${dimingZeTianpan}+${dimingZeDipan}</p>
                    <p>${dimingZeCalc.tianpanStar}+${dimingZeCalc.dipanStar}</p>
                    <p><span class="badge bg-secondary">${dimingZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">顺时针下六宫</p>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-secondary text-white">
                    地物贼
                </div>
                <div class="card-body">
                    <p>${diwuZeTianpan}+${diwuZeDipan}</p>
                    <p>${diwuZeCalc.tianpanStar}+${diwuZeCalc.dipanStar}</p>
                    <p><span class="badge bg-secondary">${diwuZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">逆时针下七宫</p>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-secondary text-white">
                    地时贼
                </div>
                <div class="card-body">
                    <p>${dishiZeTianpan}+${dishiZeDipan}</p>
                    <p>${dishiZeCalc.tianpanStar}+${dishiZeCalc.dipanStar}</p>
                    <p><span class="badge bg-secondary">${dishiZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">顺时针下八宫</p>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-secondary text-white">
                    地功贼
                </div>
                <div class="card-body">
                    <p>${digongZeTianpan}+${digongZeDipan}</p>
                    <p>${digongZeCalc.tianpanStar}+${digongZeCalc.dipanStar}</p>
                    <p><span class="badge bg-secondary">${digongZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">逆时针下九宫</p>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card h-100">
                <div class="card-header bg-secondary text-white">
                    地神贼
                </div>
                <div class="card-body">
                    <p>${dishenZeTianpan}+${dishenZeDipan}</p>
                    <p>${dishenZeCalc.tianpanStar}+${dishenZeCalc.dipanStar}</p>
                    <p><span class="badge bg-secondary">${dishenZeCalc.tuiziResult}</span></p>
                    <p class="small text-muted">顺时针下十宫</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 添加第四层盘按钮和下拉框 -->
    <div class="row mt-4" id="sicengpan-btn-container">
        <div class="col-md-12 mb-3">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    第四层盘
                </div>
                <div class="card-body text-center">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-4 mb-2">
                            <label for="sicengpan-type" class="form-label">选择类型:</label>
                            <select id="sicengpan-type" class="form-select">
                                <option value="命" selected>命</option>
                                <option value="物">物</option>
                                <option value="时">时</option>
                                <option value="功">功</option>
                                <option value="神">神</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-outline-dark" id="sicengpan-btn">显示第四层盘</button>
                        </div>
                    </div>
                    <p class="small text-muted mt-2">以天X贼的地盘放在地X贼的天盘上，然后逆时针排列</p>
                </div>
            </div>
        </div>
    </div>
    <div id="sicengpan-container" class="mt-3" style="display: none;"></div>
    
    <div class="small text-muted mt-3">
        <p>占卜类型: ${zhanType}</p>
        <p>计算时间: ${hour}:${minute.toString().padStart(2, '0')}</p>
    </div>
    `;
    
    container.innerHTML = tableHtml;
    console.log("三层盘显示完成");
    
    // 添加第四层盘按钮的点击事件
    const sicengpanBtn = document.getElementById("sicengpan-btn");
    if (sicengpanBtn) {
        sicengpanBtn.addEventListener("click", function() {
            showSicengpan(sancengPanMap, {
                tianmingZeDipan, tianmingZeTianpan,
                tianwuZeDipan, tianwuZeTianpan,
                tianshiZeDipan, tianshiZeTianpan,
                tiangongZeDipan, tiangongZeTianpan,
                tianshenZeDipan, tianshenZeTianpan,
                dimingZeDipan, dimingZeTianpan,
                diwuZeDipan, diwuZeTianpan,
                dishiZeDipan, dishiZeTianpan,
                digongZeDipan, digongZeTianpan,
                dishenZeDipan, dishenZeTianpan
            });
        });
    }
}

// 显示第四层盘
function showSicengpan(sancengPanMap, zeInfo) {
    console.log("显示第四层盘...");
    
    // 获取容器元素
    const container = document.getElementById("sicengpan-container");
    if (!container) {
        console.error("未找到第四层盘容器元素");
        return;
    }
    
    // 切换显示状态
    if (container.style.display === "none") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
        return;
    }
    
    // 获取当前时间
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // 定义地盘布局
    const dipanLayout = [
        ["巳", "午", "未", "申"],
        ["辰", "空", "空", "酉"],
        ["卯", "空", "空", "戌"],
        ["寅", "丑", "子", "亥"]
    ];
    
    // 获取选择的贼类型
    const zeType = document.getElementById("sicengpan-type").value;
    console.log(`选择的贼类型: ${zeType}`);
    
    // 确定对应的天贼和地贼
    let tianZeDipan, diZeTianpan;
    
    switch (zeType) {
        case "命":
            tianZeDipan = zeInfo.tianmingZeDipan;
            diZeTianpan = zeInfo.dimingZeTianpan;
            break;
        case "物":
            tianZeDipan = zeInfo.tianwuZeDipan;
            diZeTianpan = zeInfo.diwuZeTianpan;
            break;
        case "时":
            tianZeDipan = zeInfo.tianshiZeDipan;
            diZeTianpan = zeInfo.dishiZeTianpan;
            break;
        case "功":
            tianZeDipan = zeInfo.tiangongZeDipan;
            diZeTianpan = zeInfo.digongZeTianpan;
            break;
        case "神":
            tianZeDipan = zeInfo.tianshenZeDipan;
            diZeTianpan = zeInfo.dishenZeTianpan;
            break;
        default:
            console.error(`未知的贼类型: ${zeType}`);
            container.innerHTML = `<div class="alert alert-warning">未知的贼类型: ${zeType}</div>`;
            return;
    }
    
    console.log(`天${zeType}贼地盘: ${tianZeDipan}`);
    console.log(`地${zeType}贼天盘: ${diZeTianpan}`);
    
    // 创建第四层盘映射（地盘->天盘）
    const sicengPanMap = {};
    
    // 获取标准地支数组
    const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    
    // 获取天贼地盘和地贼天盘的索引
    const tianZeDipanIndex = branches.indexOf(tianZeDipan);
    const diZeTianpanIndex = branches.indexOf(diZeTianpan);
    
    if (tianZeDipanIndex === -1 || diZeTianpanIndex === -1) {
        console.error(`无效的地支: 天${zeType}贼地盘=${tianZeDipan}(${tianZeDipanIndex}), 地${zeType}贼天盘=${diZeTianpan}(${diZeTianpanIndex})`);
        container.innerHTML = `<div class="alert alert-warning">无法计算第四层盘: 无效的地支值</div>`;
        return;
    }
    
    // 首先，将天X贼的地盘放在地X贼的天盘位置上
    sicengPanMap[diZeTianpan] = tianZeDipan;
    console.log(`第四层盘: 将天${zeType}贼的地盘${tianZeDipan}放在地${zeType}贼的天盘${diZeTianpan}位置上`);
    
    // 然后从天X贼地盘开始，逆时针排列其余天盘
    for (let i = 1; i < 12; i++) {
        // 计算地支在地盘中的位置（正向顺序+i）
        const dipanIndex = (diZeTianpanIndex + i) % 12;
        const dipanBranch = branches[dipanIndex];
        
        // 从起点天盘索引开始，减去偏移量（因为是逆时针）
        const tianpanIndex = (tianZeDipanIndex - i + 12) % 12;
        const tianpanValue = branches[tianpanIndex];
        
        // 设置地盘到天盘的映射
        sicengPanMap[dipanBranch] = tianpanValue;
        console.log(`第四层盘: 地盘 ${dipanBranch} -> 天盘 ${tianpanValue}`);
    }
    
    // 创建第四层盘表格
    let tableHtml = `
    <div class="mb-3 alert alert-info">
        第四层盘：天${zeType}贼的地盘${tianZeDipan}放在地${zeType}贼的天盘${diZeTianpan}位置上，然后<strong>逆时针</strong>排列
    </div>
    <div class="table-responsive">
        <table class="table table-bordered text-center sicengpan-table">
    `;
    
    for (let row = 0; row < 4; row++) {
        tableHtml += '<tr>';
        
        for (let col = 0; col < 4; col++) {
            const dizhiValue = dipanLayout[row][col];
            
            if (dizhiValue === "空") {
                if (row === 1 && col === 1) {
                    tableHtml += '<td colspan="2" rowspan="2" class="center-cell bg-light">';
                    tableHtml += '<div class="center-text">第四层盘</div>';
                    tableHtml += '</td>';
                }
            } else {
                // 获取这个地支对应的天盘值
                const tianpanValue = sicengPanMap[dizhiValue] || "无";
                
                // 突出显示特殊位置
                let specialClass = "";
                if (dizhiValue === diZeTianpan && tianpanValue === tianZeDipan) {
                    specialClass = "bg-primary text-white"; // 天X贼地盘放在地X贼天盘的位置
                }
                
                tableHtml += `<td class="position-relative ${specialClass}">`;
                tableHtml += `<div class="tp-label">${tianpanValue}</div>`;
                tableHtml += `<div class="dz-label">${dizhiValue}</div>`;
                tableHtml += '</td>';
            }
        }
        
        tableHtml += '</tr>';
    }
    
    tableHtml += '</table></div>';
    tableHtml += `<div class="small text-muted mt-2">注：深色背景表示天${zeType}贼的地盘放在地${zeType}贼的天盘位置上，天盘按<strong>逆时针</strong>方向排列</div>`;
    
    // 计算第四层盘的机锋
    console.log("计算第四层盘的机锋...");
    // 获取初始天盘（下拉框选择的）
    const initialTianpanSelect = document.getElementById('tianpan');
    const initialTianpan = initialTianpanSelect.value || getCurrentKe();
    const initialTianpanDizhi = extractDizhi(initialTianpan);
    console.log(`初始天盘: ${initialTianpanDizhi}`);
    
    // 计算六合地支
    const liuHeDizhi = liuheMap[initialTianpanDizhi];
    if (!liuHeDizhi) {
        console.error(`找不到地支${initialTianpanDizhi}的六合关系`);
    }
    
    // 机锋: 找到地盘为六合地支的宫位
    const sicengJifengDipan = liuHeDizhi;  // 地盘就是六合地支
    const sicengJifengTianpan = sicengPanMap[sicengJifengDipan] || "无"; // 查找该地盘对应的天盘
    
    console.log(`第四层盘机锋: 找到地盘为${liuHeDizhi}的宫位，天盘=${sicengJifengTianpan}`);
    
    // 计算星司
    const sicengJifengTianpanPart = getBranchPartByTime(sicengJifengTianpan, hour, minute);
    const sicengJifengTianpanKey = `${sicengJifengTianpan}-${sicengJifengTianpanPart}`;
    const sicengJifengTianpanStar = xingsiNames[sicengJifengTianpanKey];
    
    const sicengJifengDipanPart = getBranchPartByTime(sicengJifengDipan, hour, minute);
    const sicengJifengDipanKey = `${sicengJifengDipan}-${sicengJifengDipanPart}`;
    const sicengJifengDipanStar = xingsiNames[sicengJifengDipanKey];
    
    // 计算推字
    const sicengJifengDipanStarNumber = xingsiNumberMap[sicengJifengDipanStar] || 0;
    const sicengJifengResult = calculateTuiziForYongShen(sicengJifengTianpanStar, sicengJifengDipanStarNumber);
    
    // 添加第四层盘的机锋卡片
    tableHtml += `
    <div class="row mt-4">
        <div class="col-md-12 mb-3">
            <div class="card">
                <div class="card-header bg-danger text-white">
                    第四层盘机锋
                </div>
                <div class="card-body">
                    <p>${sicengJifengTianpan}+${sicengJifengDipan}</p>
                    <p>${sicengJifengTianpanStar}+${sicengJifengDipanStar}</p>
                    <p><span class="badge bg-danger">${sicengJifengResult}</span></p>
                    <p class="small text-muted">初始天盘(${initialTianpanDizhi})的六合地支(${liuHeDizhi})在第四层盘中</p>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // 获取占卜类型（他占/自占）
    const taZhanRadio = document.getElementById("taZhan");
    const isForOthers = taZhanRadio && taZhanRadio.checked;
    const zhanType = isForOthers ? "他占" : "自占";
    
    tableHtml += `
    <div class="small text-muted mt-3">
        <p>占卜类型: ${zhanType}</p>
        <p>计算时间: ${hour}:${minute.toString().padStart(2, '0')}</p>
    </div>
    `;
    
    container.innerHTML = tableHtml;
    console.log("第四层盘显示完成");
}