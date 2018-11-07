using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VItem[类]
    /// </summary>
    [Serializable]
	public partial class VItem 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int ParentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ItemKey { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ShowName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Unit { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? Quota { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int ItemLevel { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int Sort { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string TopItemName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string MergeTypeWhenBudget { get; set; }
        /// <summary>
		/// 
		/// </summary>
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
        public string Remark { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ParentItemName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsHasChild { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string AllName { get; set; }
        
          
        #endregion
	}
}