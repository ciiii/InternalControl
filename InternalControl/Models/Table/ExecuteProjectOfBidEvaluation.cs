using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfBidEvaluation[360 开标评标   只要不是全部废标,就继续;   如果是全部废标,那么从开标邀请那里就不用显示了   废标时另外的操作;   只要没全废,那么提交时就不带上废标的包id了,类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfBidEvaluation 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 开标邀请函,附件
		/// </summary>
        [DisplayName("开标邀请函,附件")]
        [MaxLength(200,ErrorMessage ="BidOpeningInvitation不能超过[100]字")]
		public string BidOpeningInvitation { get; set; }
        /// <summary>
		/// 介绍信,附件
		/// </summary>
        [DisplayName("介绍信,附件")]
        [MaxLength(200,ErrorMessage ="IntroductionLetter不能超过[100]字")]
		public string IntroductionLetter { get; set; }
        /// <summary>
		/// 采购人代表委托书
		/// </summary>
        [DisplayName("采购人代表委托书")]
        [MaxLength(200,ErrorMessage ="PowerOfAttorney不能超过[100]字")]
		public string PowerOfAttorney { get; set; }
        /// <summary>
		/// 评审专家人数
		/// </summary>
        [DisplayName("评审专家人数")]
        [Required(ErrorMessage ="请提供[EvaluationExpertsNumber]")]
		public int EvaluationExpertsNumber { get; set; }
        /// <summary>
		/// 采购代表人数
		/// </summary>
        [DisplayName("采购代表人数")]
        [Required(ErrorMessage ="请提供[ProcurementOnBehalfOfNumber]")]
		public int ProcurementOnBehalfOfNumber { get; set; }
        /// <summary>
		/// 专家抽取时间
		/// </summary>
        [DisplayName("专家抽取时间")]
        [Required(ErrorMessage ="请提供[TImeOfGetExperts]")]
		public DateTime? TImeOfGetExperts { get; set; }
        /// <summary>
		/// 专家抽取地点
		/// </summary>
        [DisplayName("专家抽取地点")]
        [Required(ErrorMessage ="请提供[PlaceOfGetExperts]")]
        [MaxLength(200,ErrorMessage ="PlaceOfGetExperts不能超过[100]字")]
		public string PlaceOfGetExperts { get; set; }
        /// <summary>
		/// 专家评审时间
		/// </summary>
        [DisplayName("专家评审时间")]
		public DateTime? TimeOfExpertReview { get; set; }
        /// <summary>
		/// 专家评审地点
		/// </summary>
        [DisplayName("专家评审地点")]
        [MaxLength(200,ErrorMessage ="PlaceOfExpertReview不能超过[100]字")]
		public string PlaceOfExpertReview { get; set; }
        /// <summary>
		/// 开标时间
		/// </summary>
        [DisplayName("开标时间")]
        [Required(ErrorMessage ="请提供[BidOpeningDateTime]")]
		public DateTime? BidOpeningDateTime { get; set; }
        /// <summary>
		/// 开标地点
		/// </summary>
        [DisplayName("开标地点")]
        [Required(ErrorMessage ="请提供[BidOpeningPlace]")]
        [MaxLength(200,ErrorMessage ="BidOpeningPlace不能超过[100]字")]
		public string BidOpeningPlace { get; set; }
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