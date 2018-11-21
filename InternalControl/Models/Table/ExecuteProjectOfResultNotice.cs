using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfResultNotice[380 结果公示      这个和开标评标一样,也有针对包的废标   资金节约率 = （（预算金额 - 中标金额）/ 预算金额 ）* %   精确到两位。类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfResultNotice 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 评标报告
		/// </summary>
        [DisplayName("评标报告")]
        [MaxLength(200,ErrorMessage ="BidEvaluationReport不能超过[100]字")]
		public string BidEvaluationReport { get; set; }
        /// <summary>
		/// 结果确认函
		/// </summary>
        [DisplayName("结果确认函")]
        [MaxLength(200,ErrorMessage ="Confirmationletter不能超过[100]字")]
		public string Confirmationletter { get; set; }
        /// <summary>
		/// 结果公告
		/// </summary>
        [DisplayName("结果公告")]
        [MaxLength(200,ErrorMessage ="ResultBulletin不能超过[100]字")]
		public string ResultBulletin { get; set; }
        /// <summary>
		/// 公示网站名称
		/// </summary>
        [DisplayName("公示网站名称")]
        [MaxLength(200,ErrorMessage ="PublicityWebsiteName不能超过[100]字")]
		public string PublicityWebsiteName { get; set; }
        /// <summary>
		/// 结果公告截图
		/// </summary>
        [DisplayName("结果公告截图")]
        [MaxLength(200,ErrorMessage ="ResultAnnouncementScreenshot不能超过[100]字")]
		public string ResultAnnouncementScreenshot { get; set; }
        /// <summary>
		/// 采购小组
		/// </summary>
        [DisplayName("采购小组")]
        [MaxLength(1000,ErrorMessage ="ProcurementTeam不能超过[500]字")]
		public string ProcurementTeam { get; set; }
        /// <summary>
		/// 监督人员
		/// </summary>
        [DisplayName("监督人员")]
        [MaxLength(1000,ErrorMessage ="Inspectors不能超过[500]字")]
		public string Inspectors { get; set; }
        /// <summary>
		/// 采购流程文件
		/// </summary>
        [DisplayName("采购流程文件")]
        [MaxLength(1000,ErrorMessage ="ProcurementProcessDocument不能超过[500]字")]
		public string ProcurementProcessDocument { get; set; }
        /// <summary>
		/// CreatorId
		/// </summary>
        [DisplayName("CreatorId")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// CreateDatetime
		/// </summary>
        [DisplayName("CreateDatetime")]
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