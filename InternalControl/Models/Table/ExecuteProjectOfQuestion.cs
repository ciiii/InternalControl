using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfQuestion[质疑类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfQuestion 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
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
		/// 质疑人姓名
		/// </summary>
        [DisplayName("质疑人姓名")]
        [Required(ErrorMessage ="请提供[QuestionerName]")]
        [MaxLength(50,ErrorMessage ="QuestionerName不能超过[25]字")]
		public string QuestionerName { get; set; }
        /// <summary>
		/// 质疑时间
		/// </summary>
        [DisplayName("质疑时间")]
        [Required(ErrorMessage ="请提供[QuestioningTime]")]
		public DateTime? QuestioningTime { get; set; }
        /// <summary>
		/// 质疑附件
		/// </summary>
        [DisplayName("质疑附件")]
        [MaxLength(200,ErrorMessage ="QuestionAttachment不能超过[100]字")]
		public string QuestionAttachment { get; set; }
        /// <summary>
		/// 被质疑人姓名
		/// </summary>
        [DisplayName("被质疑人姓名")]
        [MaxLength(50,ErrorMessage ="QuestionedPersonName不能超过[25]字")]
		public string QuestionedPersonName { get; set; }
        /// <summary>
		/// 质疑回复时间
		/// </summary>
        [DisplayName("质疑回复时间")]
		public DateTime? QuestionReplyTime { get; set; }
        /// <summary>
		/// 质疑回复附件
		/// </summary>
        [DisplayName("质疑回复附件")]
        [MaxLength(200,ErrorMessage ="QuestionReplyAttachment不能超过[100]字")]
		public string QuestionReplyAttachment { get; set; }
        /// <summary>
		/// 质疑类型
		/// </summary>
        [DisplayName("质疑类型")]
        [MaxLength(50,ErrorMessage ="QuestionType不能超过[25]字")]
		public string QuestionType { get; set; }
        /// <summary>
		/// 质疑结论
		/// </summary>
        [DisplayName("质疑结论")]
        [MaxLength(2000,ErrorMessage ="QuestionConclusion不能超过[1000]字")]
		public string QuestionConclusion { get; set; }
        /// <summary>
		/// 是否有投诉
		/// </summary>
        [DisplayName("是否有投诉")]
        [Required(ErrorMessage ="请提供[IsThereScomplaint]")]
		public bool IsThereScomplaint { get; set; }
        /// <summary>
		/// 投诉人姓名
		/// </summary>
        [DisplayName("投诉人姓名")]
        [MaxLength(50,ErrorMessage ="ComplainantName不能超过[25]字")]
		public string ComplainantName { get; set; }
        /// <summary>
		/// 投诉时间
		/// </summary>
        [DisplayName("投诉时间")]
		public DateTime? ComplainantTime { get; set; }
        /// <summary>
		/// 投诉附件
		/// </summary>
        [DisplayName("投诉附件")]
        [MaxLength(200,ErrorMessage ="ComplainantAttachment不能超过[100]字")]
		public string ComplainantAttachment { get; set; }
        /// <summary>
		/// 被投诉人姓名
		/// </summary>
        [DisplayName("被投诉人姓名")]
        [MaxLength(50,ErrorMessage ="RespondentName不能超过[25]字")]
		public string RespondentName { get; set; }
        /// <summary>
		/// 投诉回复部门
		/// </summary>
        [DisplayName("投诉回复部门")]
        [MaxLength(50,ErrorMessage ="ComplainantReplyDepartment不能超过[25]字")]
		public string ComplainantReplyDepartment { get; set; }
        /// <summary>
		/// 投诉回复时间
		/// </summary>
        [DisplayName("投诉回复时间")]
		public DateTime? ComplainantReplyTime { get; set; }
        /// <summary>
		/// 投诉回复附件
		/// </summary>
        [DisplayName("投诉回复附件")]
        [MaxLength(200,ErrorMessage ="ComplainantReplyAttachment不能超过[100]字")]
		public string ComplainantReplyAttachment { get; set; }
        /// <summary>
		/// 投诉公示地址
		/// </summary>
        [DisplayName("投诉公示地址")]
        [MaxLength(200,ErrorMessage ="ComplainantPublicityAddress不能超过[100]字")]
		public string ComplainantPublicityAddress { get; set; }
        /// <summary>
		/// 投诉公示网站
		/// </summary>
        [DisplayName("投诉公示网站")]
        [MaxLength(200,ErrorMessage ="ComplainantPublicityWebsite不能超过[100]字")]
		public string ComplainantPublicityWebsite { get; set; }
        /// <summary>
		/// 记录人id
		/// </summary>
        [DisplayName("记录人id")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// 记录日期时间
		/// </summary>
        [DisplayName("记录日期时间")]
        [Required(ErrorMessage ="请提供[CreateDatetime]")]
		public DateTime? CreateDatetime { get; set; }
        
        
        #endregion
	}
}