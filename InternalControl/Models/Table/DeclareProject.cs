using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// DeclareProject[100时生成/编辑      申报项目,其中包需满足:   同为集采-货物,包数1+,   同为集采-服务,包数1+,一般是1;   同为非集采,包数1+,一般为1;      项目中所有拟/实施时间，统一显示为格式为〔年-月〕。类]
    /// </summary>
    [Serializable]
	public partial class DeclareProject 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 申报年度
		/// </summary>
        [DisplayName("申报年度")]
        [Required(ErrorMessage ="请提供[Year]")]
		public int Year { get; set; }
        /// <summary>
		/// 项目名称
		/// </summary>
        [DisplayName("项目名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(200,ErrorMessage ="Name不能超过[100]字")]
		public string Name { get; set; }
        /// <summary>
		/// 项目类型
		/// </summary>
        [DisplayName("项目类型")]
        [Required(ErrorMessage ="请提供[ProjectType]")]
        [MaxLength(50,ErrorMessage ="ProjectType不能超过[25]字")]
		public string ProjectType { get; set; }
        /// <summary>
		/// 归口部门Id
		/// </summary>
        [DisplayName("归口部门Id")]
        [Required(ErrorMessage ="请提供[RelevantDepartmentId]")]
		public int RelevantDepartmentId { get; set; }
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
		/// 是否为政府集中采购
		/// </summary>
        [DisplayName("是否为政府集中采购")]
        [Required(ErrorMessage ="请提供[IsCenterPurchase]")]
		public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 拟采购方式
		/// </summary>
        [DisplayName("拟采购方式")]
        [MaxLength(50,ErrorMessage ="PlanPurchaseMethod不能超过[25]字")]
		public string PlanPurchaseMethod { get; set; }
        /// <summary>
		/// 拟实施时间
		/// </summary>
        [DisplayName("拟实施时间")]
        [Required(ErrorMessage ="请提供[DateOfPlanToImplement]")]
		public DateTime? DateOfPlanToImplement { get; set; }
        /// <summary>
		/// 申报理由
		/// </summary>
        [DisplayName("申报理由")]
        [Required(ErrorMessage ="请提供[Reason]")]
        [MaxLength(1000,ErrorMessage ="Reason不能超过[500]字")]
		public string Reason { get; set; }
        /// <summary>
		/// 申报申请,附件
		/// </summary>
        [DisplayName("申报申请,附件")]
        [MaxLength(200,ErrorMessage ="Attachment不能超过[100]字")]
		public string Attachment { get; set; }
        /// <summary>
		/// 申报人Id
		/// </summary>
        [DisplayName("申报人Id")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// 申报时间,建立时间
		/// </summary>
        [DisplayName("申报时间,建立时间")]
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