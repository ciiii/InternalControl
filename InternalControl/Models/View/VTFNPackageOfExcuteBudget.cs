using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VTFNPackageOfExcuteBudget[类]
    /// </summary>
    [Serializable]
	public partial class VTFNPackageOfExcuteBudget 
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
        public int ExecuteProjectId { get; set; }
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
        public bool IsImported { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? SerialNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ExecuteTechnicalRequirements { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int ExecuteNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int ExecuteUnitPrice { get; set; }
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
        /// <summary>
		/// 
		/// </summary>
        public string BudgetName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string BudgetTypeName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsMSE { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ExecutePurchaseMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsCanOperate { get; set; }
        
          
        #endregion
	}
}