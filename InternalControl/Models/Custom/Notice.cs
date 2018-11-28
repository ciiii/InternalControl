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

        /// <summary>
        /// 创建时间大于等于此时间的
        /// </summary>
        public DateTime? BeginCreateDatetime { get; set; }

        /// <summary>
        /// 创建时间小于等于此时间的
        /// </summary>
        public DateTime? EndCreateDatetime { get; set; }
    }

    public class NoticeReceivingConditionFilter
    {
        public int? NoticeId { get; set; }
    }

    /// <summary>
    /// 任务通知的搜索条件
    /// </summary>
    public class ProjectBacklogFilter
    {
        /// <summary>
        /// 模糊:名称
        /// </summary>
        public string LikeMessage { get; set; }

        /// <summary>
        /// 项目类型只有:项目申报 项目预算 项目执行
        /// </summary>
        public string FlowTemplateName { get; set; }

    }
}
