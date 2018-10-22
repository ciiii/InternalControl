using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace InternalControl.Models
{
    /// <summary>
    /// 通知公告的搜索条件
    /// </summary>
    public class NoticeFilter
    {
        /// <summary>
        /// 类型只有:通知消息 任务消息
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// 模糊:通知名称
        /// </summary>
        public string LikeName { get; set; }

        /// <summary>
        /// 模糊:通知内容
        /// </summary>
        public string LikeContent { get; set; }

        /// <summary>
        /// 发送人id
        /// </summary>
        public int? SendorId { get; set; }

        /// <summary>
        /// 模糊:发送人姓名
        /// </summary>
        public string LikeSendorName { get; set; }
    }

    public class NoticeReceivingConditionFilter
    {
        public int? NoticeId { get; set; }
    }
}
