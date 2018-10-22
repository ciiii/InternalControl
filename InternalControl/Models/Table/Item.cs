using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Item[类]
    /// </summary>
    [Serializable]
	public partial class Item 
	{       
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[ParentId]")]
		public int ParentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[ItemKey]")]
        [MaxLength(100,ErrorMessage ="ItemKey不能超过[50]字")]
		public string ItemKey { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[IsCenterPurchase]")]
		public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [MaxLength(100,ErrorMessage ="ShowName不能超过[50]字")]
		public string ShowName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [MaxLength(10,ErrorMessage ="Unit不能超过[5]字")]
		public string Unit { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int? Quota { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[ItemLevel]")]
		public int ItemLevel { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Sort]")]
		public int Sort { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[TopItemName]")]
        [MaxLength(100,ErrorMessage ="TopItemName不能超过[50]字")]
		public string TopItemName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[MergeTypeWhenBudget]")]
        [MaxLength(100,ErrorMessage ="MergeTypeWhenBudget不能超过[50]字")]
		public string MergeTypeWhenBudget { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[MergeTypeWhenExecute]")]
        [MaxLength(100,ErrorMessage ="MergeTypeWhenExecute不能超过[50]字")]
		public string MergeTypeWhenExecute { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int? LimitOfPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public bool? IsCanMaintenance { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}