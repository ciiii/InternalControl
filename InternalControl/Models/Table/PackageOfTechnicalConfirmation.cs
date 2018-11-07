using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfTechnicalConfirmation[320 执行阶段的技术确认信息,      招标方式Id,如果是最低评标方式,则不显示评分标准类]
    /// </summary>
    [Serializable]
	public partial class PackageOfTechnicalConfirmation 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 是否面向中小企业
		/// </summary>
        [DisplayName("是否面向中小企业")]
        [Required(ErrorMessage ="请提供[IsMSE]")]
		public bool IsMSE { get; set; }
        /// <summary>
		/// 招标方式
		/// </summary>
        [DisplayName("招标方式")]
        [Required(ErrorMessage ="请提供[BiddingMethod]")]
        [MaxLength(50,ErrorMessage ="BiddingMethod不能超过[25]字")]
		public string BiddingMethod { get; set; }
        /// <summary>
		/// 是否接受联合体
		/// </summary>
        [DisplayName("是否接受联合体")]
        [Required(ErrorMessage ="请提供[IsAcceptCombo]")]
		public bool IsAcceptCombo { get; set; }
        /// <summary>
		/// 是否收取投标保证金
		/// </summary>
        [DisplayName("是否收取投标保证金")]
        [Required(ErrorMessage ="请提供[IsTakeBidBond]")]
		public bool IsTakeBidBond { get; set; }
        /// <summary>
		/// 投标保证金
		/// </summary>
        [DisplayName("投标保证金")]
		public int? BidBond { get; set; }
        /// <summary>
		/// 是否收取履约保证金
		/// </summary>
        [DisplayName("是否收取履约保证金")]
        [Required(ErrorMessage ="请提供[IsTakePerformanceBond]")]
		public bool IsTakePerformanceBond { get; set; }
        /// <summary>
		/// 履约保证金
		/// </summary>
        [DisplayName("履约保证金")]
		public int? PerformanceBond { get; set; }
        /// <summary>
		/// 项目联系人姓名
		/// </summary>
        [DisplayName("项目联系人姓名")]
        [MaxLength(50,ErrorMessage ="LinkmanName不能超过[25]字")]
		public string LinkmanName { get; set; }
        /// <summary>
		/// 联系电话
		/// </summary>
        [DisplayName("联系电话")]
        [MaxLength(50,ErrorMessage ="LinkmanPhone不能超过[25]字")]
		public string LinkmanPhone { get; set; }
        /// <summary>
		/// 服务期限
		/// </summary>
        [DisplayName("服务期限")]
        [MaxLength(1000,ErrorMessage ="TermOfService不能超过[500]字")]
		public string TermOfService { get; set; }
        /// <summary>
		/// 资格条件
		/// </summary>
        [DisplayName("资格条件")]
		public string Prerequisites { get; set; }
        /// <summary>
		/// 付款方式
		/// </summary>
        [DisplayName("付款方式")]
        [MaxLength(1000,ErrorMessage ="PaymentMethod不能超过[500]字")]
		public string PaymentMethod { get; set; }
        /// <summary>
		/// 技术参数附件地址
		/// </summary>
        [DisplayName("技术参数附件地址")]
        [MaxLength(200,ErrorMessage ="Attachment不能超过[100]字")]
		public string Attachment { get; set; }
        /// <summary>
		/// 新的技术参数
		/// </summary>
        [DisplayName("新的技术参数")]
		public string TechnicalRequirements { get; set; }
        /// <summary>
		/// 评分标准
		/// </summary>
        [DisplayName("评分标准")]
        [MaxLength(200,ErrorMessage ="GradingStandard不能超过[100]字")]
		public string GradingStandard { get; set; }
        /// <summary>
		/// Remark
		/// </summary>
        [DisplayName("Remark")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}