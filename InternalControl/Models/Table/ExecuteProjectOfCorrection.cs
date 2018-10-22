using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfCorrection[更正类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfCorrection 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [Obsolete]
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 执行项目id
		/// </summary>
        [DisplayName("执行项目id")]
        [Required(ErrorMessage ="请提供[ExecuteProjectId]")]
		public int ExecuteProjectId { get; set; }
        /// <summary>
		/// 更正内容
		/// </summary>
        [DisplayName("更正内容")]
        [Required(ErrorMessage ="请提供[Content]")]
        [MaxLength(2000,ErrorMessage ="Content不能超过[1000]字")]
		public string Content { get; set; }
        /// <summary>
		/// 更正附件
		/// </summary>
        [DisplayName("更正附件")]
        [MaxLength(200,ErrorMessage ="Attachment不能超过[100]字")]
		public string Attachment { get; set; }
        /// <summary>
		/// 更正公告确认函
		/// </summary>
        [DisplayName("更正公告确认函")]
        [MaxLength(200,ErrorMessage ="NoticeConfirmationLetter不能超过[100]字")]
		public string NoticeConfirmationLetter { get; set; }
        /// <summary>
		/// 更正公告地址
		/// </summary>
        [DisplayName("更正公告地址")]
        [MaxLength(200,ErrorMessage ="NoticeAddress不能超过[100]字")]
		public string NoticeAddress { get; set; }
        /// <summary>
		/// 更正公告截图
		/// </summary>
        [DisplayName("更正公告截图")]
        [MaxLength(200,ErrorMessage ="NoticeScreenShot不能超过[100]字")]
		public string NoticeScreenShot { get; set; }
        /// <summary>
		/// 公示网站名称
		/// </summary>
        [DisplayName("公示网站名称")]
        [MaxLength(200,ErrorMessage ="PublicityWebsite不能超过[100]字")]
		public string PublicityWebsite { get; set; }
        /// <summary>
		/// 更正类型
		/// </summary>
        [DisplayName("更正类型")]
        [MaxLength(50,ErrorMessage ="Type不能超过[25]字")]
		public string Type { get; set; }
        /// <summary>
		/// 更正原因
		/// </summary>
        [DisplayName("更正原因")]
        [MaxLength(50,ErrorMessage ="Reason不能超过[25]字")]
		public string Reason { get; set; }
        /// <summary>
		/// 旧的标书发售时间
		/// </summary>
        [DisplayName("旧的标书发售时间")]
		public DateTime? OldTenderOfferDatetime { get; set; }
        /// <summary>
		/// 新的标书发售时间
		/// </summary>
        [DisplayName("新的标书发售时间")]
		public DateTime? NewTenderOfferDatetime { get; set; }
        /// <summary>
		/// 旧的投标保证金截止时间
		/// </summary>
        [DisplayName("旧的投标保证金截止时间")]
		public DateTime? OldDeadlineOfBidBond { get; set; }
        /// <summary>
		/// 新的投标保证金截止时间
		/// </summary>
        [DisplayName("新的投标保证金截止时间")]
		public DateTime? NewDeadlineOfBidBond { get; set; }
        /// <summary>
		/// 旧的开标时间
		/// </summary>
        [DisplayName("旧的开标时间")]
		public DateTime? OldOpeningBIdTime { get; set; }
        /// <summary>
		/// 新的开标时间
		/// </summary>
        [DisplayName("新的开标时间")]
		public DateTime? NewOpeningBIdTime { get; set; }
        /// <summary>
		/// 技术要求附件
		/// </summary>
        [DisplayName("技术要求附件")]
        [MaxLength(200,ErrorMessage ="TechnicalRequirement不能超过[100]字")]
		public string TechnicalRequirement { get; set; }
        /// <summary>
		/// 更正人id
		/// </summary>
        [DisplayName("更正人id")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// 更正日期时间
		/// </summary>
        [DisplayName("更正日期时间")]
        [Required(ErrorMessage ="请提供[CreateDatetime]")]
		public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}