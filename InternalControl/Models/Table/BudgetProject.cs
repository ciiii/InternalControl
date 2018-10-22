using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// BudgetProject[预算项目   自动拆分申报项目的包为预算项目,以及合并时生成/编辑      * 详情页面中联系人、联系电话默认空白，执行流程时联系人、联系电话默认使用前面填写的信息。   当发生项目合并操作后，联系人、联系电话默认空白。有合并时,遇到此类情况都这样处理      论证前合并   预算项目在进入论证之前,可以合并,合并的条件为   1 是否同为集采或非集采;   2 品目相同;(集采的品目相同,非集采的同为货物或服务,可以用品目里面的预算合并分类来),合并时，合并品目分类id会带过来，以方便再次合并   3 归口部门相同;   4 都没有进入论证   5 都通过了申请审核   6 当集采时,合并次数 = 0才能合并;(合并后合并次数加1)   类]
    /// </summary>
    [Serializable]
	public partial class BudgetProject 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[SourcePackageId]")]
		public int SourcePackageId { get; set; }
        /// <summary>
		/// 申报年度
		/// </summary>
        [DisplayName("申报年度")]
        [Required(ErrorMessage ="请提供[Year]")]
		public int Year { get; set; }
        /// <summary>
		/// 项目类型
		/// </summary>
        [DisplayName("项目类型")]
        [MaxLength(50,ErrorMessage ="ProjectType不能超过[25]字")]
		public string ProjectType { get; set; }
        /// <summary>
		/// 预算时的合并分类
		/// </summary>
        [DisplayName("预算时的合并分类")]
        [Required(ErrorMessage ="请提供[MergeTypeWhenBudget]")]
        [MaxLength(100,ErrorMessage ="MergeTypeWhenBudget不能超过[50]字")]
		public string MergeTypeWhenBudget { get; set; }
        /// <summary>
		/// 项目名称
		/// </summary>
        [DisplayName("项目名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
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
		/// 是否为政府集中采购,合并各包此项必须相同,冗余字段
		/// </summary>
        [DisplayName("是否为政府集中采购,合并各包此项必须相同,冗余字段")]
        [Required(ErrorMessage ="请提供[ISCenterPurchase]")]
		public bool ISCenterPurchase { get; set; }
        /// <summary>
		/// 采购人名称
		/// </summary>
        [DisplayName("采购人名称")]
        [Required(ErrorMessage ="请提供[PurchaserName]")]
        [MaxLength(50,ErrorMessage ="PurchaserName不能超过[25]字")]
		public string PurchaserName { get; set; }
        /// <summary>
		/// 采购人地址
		/// </summary>
        [DisplayName("采购人地址")]
        [Required(ErrorMessage ="请提供[PurchaserAddress]")]
        [MaxLength(200,ErrorMessage ="PurchaserAddress不能超过[100]字")]
		public string PurchaserAddress { get; set; }
        /// <summary>
		/// 采购方式
		/// </summary>
        [DisplayName("采购方式")]
        [Required(ErrorMessage ="请提供[PurchaseMethod]")]
        [MaxLength(50,ErrorMessage ="PurchaseMethod不能超过[25]字")]
		public string PurchaseMethod { get; set; }
        /// <summary>
		/// 拟实施时间,取合并中最近一个
		/// </summary>
        [DisplayName("拟实施时间,取合并中最近一个")]
        [Required(ErrorMessage ="请提供[TimePlanToImplement]")]
		public DateTime? TimePlanToImplement { get; set; }
        /// <summary>
		/// 合并次数
		/// </summary>
        [DisplayName("合并次数")]
        [Required(ErrorMessage ="请提供[MergeTimes]")]
		public int MergeTimes { get; set; }
        /// <summary>
		/// 合并人Id,第一次分拆时,这个和建立人相同
		/// </summary>
        [DisplayName("合并人Id,第一次分拆时,这个和建立人相同")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// 合并时间,第一次分拆时,这个和建立时间相同
		/// </summary>
        [DisplayName("合并时间,第一次分拆时,这个和建立时间相同")]
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