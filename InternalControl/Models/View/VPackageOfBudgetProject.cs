using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VPackageOfBudgetProject[类]
    /// </summary>
    [Serializable]
	public partial class VPackageOfBudgetProject 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PackageName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int DeclareCreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string DeclareCreatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? DeclareDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string DeclareDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int BudgetProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int ItemId { get; set; }
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
        public string ItemName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ItemShowName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? LimitOfPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool IsImported { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string BudgetTechnicalRequirements { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int BudgetNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int BudgetUnitPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Unit { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Attachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Remark { get; set; }
        
          
        #endregion
	}
}