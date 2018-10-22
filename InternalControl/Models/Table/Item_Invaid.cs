using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Item_Invaid[品目   合并分类:   对于集采,就是品目;   对于非集采,货物和服务的=1;工程的=2   方便合并的判断类]
    /// </summary>
    [Serializable]
	public partial class Item_Invaid 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// ParentId
		/// </summary>
        [DisplayName("ParentId")]
        [Required(ErrorMessage ="请提供[ParentId]")]
		public int ParentId { get; set; }
        /// <summary>
		/// 关键字
		/// </summary>
        [DisplayName("关键字")]
        [Required(ErrorMessage ="请提供[ItemKey]")]
        [MaxLength(100,ErrorMessage ="ItemKey不能超过[50]字")]
		public string ItemKey { get; set; }
        /// <summary>
		/// 是否为政府集中采购
		/// </summary>
        [DisplayName("是否为政府集中采购")]
        [Required(ErrorMessage ="请提供[IsCenterPurchase]")]
		public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 品目名称
		/// </summary>
        [DisplayName("品目名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 显示名称
		/// </summary>
        [DisplayName("显示名称")]
        [MaxLength(100,ErrorMessage ="ShowName不能超过[50]字")]
		public string ShowName { get; set; }
        /// <summary>
		/// 单位
		/// </summary>
        [DisplayName("单位")]
        [MaxLength(10,ErrorMessage ="Unit不能超过[5]字")]
		public string Unit { get; set; }
        /// <summary>
		/// 限额,作为集采品目时单价不能小于此限额
		/// </summary>
        [DisplayName("限额,作为集采品目时单价不能小于此限额")]
		public int? Quota { get; set; }
        /// <summary>
		/// 级别
		/// </summary>
        [DisplayName("级别")]
        [Required(ErrorMessage ="请提供[ItemLevel]")]
		public int ItemLevel { get; set; }
        /// <summary>
		/// 排序
		/// </summary>
        [DisplayName("排序")]
        [Required(ErrorMessage ="请提供[Sort]")]
		public int Sort { get; set; }
        /// <summary>
		/// 根品目名称,货物|工程|服务
		/// </summary>
        [DisplayName("根品目名称,货物|工程|服务")]
        [Required(ErrorMessage ="请提供[TopItemName]")]
        [MaxLength(100,ErrorMessage ="TopItemName不能超过[50]字")]
		public string TopItemName { get; set; }
        /// <summary>
		/// 预算时的合并分类
		/// </summary>
        [DisplayName("预算时的合并分类")]
        [Required(ErrorMessage ="请提供[MergeTypeWhenBudget]")]
        [MaxLength(100,ErrorMessage ="MergeTypeWhenBudget不能超过[50]字")]
		public string MergeTypeWhenBudget { get; set; }
        /// <summary>
		/// 执行时的合并分类
		/// </summary>
        [DisplayName("执行时的合并分类")]
        [Required(ErrorMessage ="请提供[MergeTypeWhenExecute]")]
        [MaxLength(100,ErrorMessage ="MergeTypeWhenExecute不能超过[50]字")]
		public string MergeTypeWhenExecute { get; set; }
        /// <summary>
		/// 单价上限标准
		/// </summary>
        [DisplayName("单价上限标准")]
		public int? LimitOfPrice { get; set; }
        /// <summary>
		/// 是否可以维护
		/// </summary>
        [DisplayName("是否可以维护")]
		public bool? IsCanMaintenance { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}