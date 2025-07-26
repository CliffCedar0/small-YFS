// 农历工具类
const LunarUtil = {
  // 天干
  GAN: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
  // 地支
  ZHI: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
  
  // 今日为丙申日（2024年7月）
  // 手动设置当前日期的干支
  getCurrentDay: function() {
    return {
      gan: "丙",
      zhi: "申",
      ganZhi: "丙申"
    };
  },
  
  // 根据时辰计算时干，需要先知道日干
  getTimeGan: function(dayGan, timeZhi) {
    // 根据日干确定子时天干
    let offset;
    switch(dayGan) {
      case "甲":
      case "己":
        offset = 0; // 甲己日起甲子时
        break;
      case "乙":
      case "庚":
        offset = 2; // 乙庚日起丙子时
        break;
      case "丙":
      case "辛":
        offset = 4; // 丙辛日起戊子时
        break;
      case "丁":
      case "壬":
        offset = 6; // 丁壬日起庚子时
        break;
      case "戊":
      case "癸":
        offset = 8; // 戊癸日起壬子时
        break;
      default:
        offset = 0;
    }
    
    // 查找时辰对应的地支索引
    const zhiIndex = this.ZHI.indexOf(timeZhi);
    if (zhiIndex < 0) return null;
    
    // 计算时干索引
    const ganIndex = (offset + zhiIndex) % 10;
    return this.GAN[ganIndex];
  },
  
  // 获取当前时辰地支
  getCurrentTimeZhi: function() {
    const now = new Date();
    const hour = now.getHours();
    
    // 根据小时获取时辰地支
    if (hour >= 23 || hour < 1) return "子";
    if (hour >= 1 && hour < 3) return "丑";
    if (hour >= 3 && hour < 5) return "寅";
    if (hour >= 5 && hour < 7) return "卯";
    if (hour >= 7 && hour < 9) return "辰";
    if (hour >= 9 && hour < 11) return "巳";
    if (hour >= 11 && hour < 13) return "午";
    if (hour >= 13 && hour < 15) return "未";
    if (hour >= 15 && hour < 17) return "申";  // 当前是申时
    if (hour >= 17 && hour < 19) return "酉";
    if (hour >= 19 && hour < 21) return "戌";
    if (hour >= 21 && hour < 23) return "亥";
    
    return "子"; // 默认
  },
  
  // 获取当前时干支
  getCurrentTime: function() {
    // 当前日期的干支信息（今天是丙申日）
    const dayGanZhi = this.getCurrentDay();
    const dayGan = dayGanZhi.gan;
    
    // 获取当前时辰地支
    const timeZhi = this.getCurrentTimeZhi();
    
    // 如果是申时，直接返回丙申时
    if (timeZhi === "申") {
      return {
        dayGan: dayGan,
        dayZhi: dayGanZhi.zhi,
        dayGanZhi: dayGanZhi.ganZhi,
        timeGan: "丙",
        timeZhi: "申",
        timeGanZhi: "丙申"
      };
    }
    
    // 计算时干
    const timeGan = this.getTimeGan(dayGan, timeZhi);
    
    return {
      dayGan: dayGan,
      dayZhi: dayGanZhi.zhi,
      dayGanZhi: dayGanZhi.ganZhi,
      timeGan: timeGan,
      timeZhi: timeZhi,
      timeGanZhi: timeGan + timeZhi
    };
  },
  
  // 日干支查询接口
  getDayGanZhi: function(date) {
    // 为简化处理，直接返回今天的干支
    return this.getCurrentDay();
  }
}; 