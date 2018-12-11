using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfConfirm[340 采购确认类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfConfirm 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 代理服务费
		/// </summary>
        [DisplayName("代理服务费")]
		public int? AgencyFee { get; set; }
        /// <summary>
		/// 代理合同
		/// </summary>
        [DisplayName("代理合同")]
        [MaxLength(200,ErrorMessage ="AgencyContract不能超过[100]字")]
		public string AgencyContract { get; set; }
        /// <summary>
		/// 采购文件
		/// </summary>
        [DisplayName("采购文件")]
        [Required(ErrorMessage ="请提供[ProcurementDocuments]")]
        [MaxLength(200,ErrorMessage ="ProcurementDocuments不能超过[100]字")]
		public string ProcurementDocuments { get; set; }
        /// <summary>
		/// 采购文件确认函
		/// </summary>
        [DisplayName("采购文件确认函")]
        [MaxLength(200,ErrorMessage ="ConfirmationLetter不能超过[100]字")]
		public string ConfirmationLetter { get; set; }
        /// <summary>
		/// 拟开标时间
		/// </summary>
        [DisplayName("拟开标时间")]
        [Required(ErrorMessage ="请提供[PlanBidOpeningTime]")]
		public DateTime? PlanBidOpeningTime { get; set; }
        /// <summary>
		/// 开标地点
		/// </summary>
        [DisplayName("开标地点")]
        [Required(ErrorMessage ="请提供[OpeningPlace]")]
        [MaxLength(200,ErrorMessage ="OpeningPlace不能超过[100]字")]
		public string OpeningPlace { get; set; }
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