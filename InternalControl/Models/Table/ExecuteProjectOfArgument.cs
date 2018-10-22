using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfArgument[330 执行论证   如果采购方式为单一来源,则"是否进行需求论证"文字改为"是否进行单一来源论证"      项目中有分包为进口产品时,需求展示"是否进行进口产品论证"类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfArgument 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 是否进行需求论证
		/// </summary>
        [DisplayName("是否进行需求论证")]
        [Required(ErrorMessage ="请提供[IsNeedArgumentFile]")]
		public bool IsNeedArgumentFile { get; set; }
        /// <summary>
		/// 需求论证报告
		/// </summary>
        [DisplayName("需求论证报告")]
        [MaxLength(200,ErrorMessage ="ArgumentFile不能超过[100]字")]
		public string ArgumentFile { get; set; }
        /// <summary>
		/// 需求论证时间
		/// </summary>
        [DisplayName("需求论证时间")]
		public DateTime? ArgumentDatetime { get; set; }
        /// <summary>
		/// 是否进行需求论证公示
		/// </summary>
        [DisplayName("是否进行需求论证公示")]
        [Required(ErrorMessage ="请提供[IsNeedAnnouncementArgument]")]
		public bool IsNeedAnnouncementArgument { get; set; }
        /// <summary>
		/// 需求论证公示地址
		/// </summary>
        [DisplayName("需求论证公示地址")]
        [MaxLength(200,ErrorMessage ="AnnouncementArgumentUrl不能超过[100]字")]
		public string AnnouncementArgumentUrl { get; set; }
        /// <summary>
		/// 需求论证公示截图
		/// </summary>
        [DisplayName("需求论证公示截图")]
        [MaxLength(200,ErrorMessage ="AnnouncementArgumentScreenshots不能超过[100]字")]
		public string AnnouncementArgumentScreenshots { get; set; }
        /// <summary>
		/// 需求论证公示网站名称
		/// </summary>
        [DisplayName("需求论证公示网站名称")]
        [MaxLength(200,ErrorMessage ="AnnouncementArgumentSiteName不能超过[100]字")]
		public string AnnouncementArgumentSiteName { get; set; }
        /// <summary>
		/// 需求论证公示时间
		/// </summary>
        [DisplayName("需求论证公示时间")]
		public DateTime? AnnouncementArgumentDatetime { get; set; }
        /// <summary>
		/// 是否进行进口产品论证
		/// </summary>
        [DisplayName("是否进行进口产品论证")]
        [Required(ErrorMessage ="请提供[IsNeedArgumentFileByImported]")]
		public bool IsNeedArgumentFileByImported { get; set; }
        /// <summary>
		/// 进口产品论证报告
		/// </summary>
        [DisplayName("进口产品论证报告")]
        [MaxLength(200,ErrorMessage ="ArgumentFileByImported不能超过[100]字")]
		public string ArgumentFileByImported { get; set; }
        /// <summary>
		/// 进口产品审批文件
		/// </summary>
        [DisplayName("进口产品审批文件")]
        [MaxLength(200,ErrorMessage ="ApprovalFileByImported不能超过[100]字")]
		public string ApprovalFileByImported { get; set; }
        /// <summary>
		/// 进口产品论证时间
		/// </summary>
        [DisplayName("进口产品论证时间")]
		public DateTime? ArgumentByImportedDatetime { get; set; }
        /// <summary>
		/// 是否进行进口产品公示
		/// </summary>
        [DisplayName("是否进行进口产品公示")]
        [Required(ErrorMessage ="请提供[IsNeedAnnouncementByImported]")]
		public bool IsNeedAnnouncementByImported { get; set; }
        /// <summary>
		/// 进口产品公示地址
		/// </summary>
        [DisplayName("进口产品公示地址")]
        [MaxLength(200,ErrorMessage ="AnnouncementByImportedUrl不能超过[100]字")]
		public string AnnouncementByImportedUrl { get; set; }
        /// <summary>
		/// 进口产品公示截图
		/// </summary>
        [DisplayName("进口产品公示截图")]
        [MaxLength(200,ErrorMessage ="AnnouncementByImportedScreenshots不能超过[100]字")]
		public string AnnouncementByImportedScreenshots { get; set; }
        /// <summary>
		/// 进口产品公示网站名称
		/// </summary>
        [DisplayName("进口产品公示网站名称")]
        [MaxLength(200,ErrorMessage ="AnnouncementByImportedSiteName不能超过[100]字")]
		public string AnnouncementByImportedSiteName { get; set; }
        /// <summary>
		/// 进口产品公示时间
		/// </summary>
        [DisplayName("进口产品公示时间")]
		public DateTime? AnnouncementByImportedDatetime { get; set; }
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