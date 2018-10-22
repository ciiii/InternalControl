using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfInvitation[350 采购邀请类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfInvitation 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 供应商邀请方式
		/// </summary>
        [DisplayName("供应商邀请方式")]
        [Required(ErrorMessage ="请提供[SupplierInvitationMethod]")]
        [MaxLength(50,ErrorMessage ="SupplierInvitationMethod不能超过[25]字")]
		public string SupplierInvitationMethod { get; set; }
        /// <summary>
		/// 采购公告地址   
		/// </summary>
        [DisplayName("采购公告地址   ")]
        [MaxLength(200,ErrorMessage ="PurchaseAnnouncementUrl不能超过[100]字")]
		public string PurchaseAnnouncementUrl { get; set; }
        /// <summary>
		/// 采购公告截图
		/// </summary>
        [DisplayName("采购公告截图")]
        [MaxLength(200,ErrorMessage ="PurchaseAnnouncementScreenshot不能超过[100]字")]
		public string PurchaseAnnouncementScreenshot { get; set; }
        /// <summary>
		/// 采购公告网站名称
		/// </summary>
        [DisplayName("采购公告网站名称")]
        [MaxLength(200,ErrorMessage ="PurchaseAnnouncementWebsiteName不能超过[100]字")]
		public string PurchaseAnnouncementWebsiteName { get; set; }
        /// <summary>
		/// 标书发售时间   
		/// </summary>
        [DisplayName("标书发售时间   ")]
		public DateTime? TenderOfferDatetime { get; set; }
        /// <summary>
		/// 投标保证金截止时间
		/// </summary>
        [DisplayName("投标保证金截止时间")]
		public DateTime? DeadlineOfBidBond { get; set; }
        /// <summary>
		/// 开标时间
		/// </summary>
        [DisplayName("开标时间")]
		public DateTime? OpeningBIdTime { get; set; }
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