using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VBudgetProjectNotInFlowAndCanCombine[类]
    /// </summary>
    [Serializable]
	public partial class VBudgetProjectNotInFlowAndCanCombine 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int SourcePackageId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int Year { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ProjectType { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string MergeTypeWhenBudget { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int RelevantDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string RelevantDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LinkmanName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LinkmanPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PurchaserName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PurchaserAddress { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PurchaseMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime TimePlanToImplement { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int MergeTimes { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime CreateDatetime { get; set; }
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
        public bool? IsFinancialCapital { get; set; }
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
        public int? CountOfPackage { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? TotalDeclareAmount { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? TotalBudgetAmount { get; set; }
        
          
        #endregion
	}
}