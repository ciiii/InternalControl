using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VBudgetProject[类]
    /// </summary>
    [Serializable]
	public partial class VBudgetProject 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		//public int Id { get; set; }
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int SourcePackageId { get; set; }
        public int SourcePackageId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int Year { get; set; }
        public int Year { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ProjectType { get; set; }
        public string ProjectType { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string MergeTypeWhenBudget { get; set; }
        public string MergeTypeWhenBudget { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Name { get; set; }
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int RelevantDepartmentId { get; set; }
        public int RelevantDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string RelevantDepartmentName { get; set; }
        public string RelevantDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LinkmanName { get; set; }
        public string LinkmanName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LinkmanPhone { get; set; }
        public string LinkmanPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsCenterPurchase { get; set; }
        public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string PurchaserName { get; set; }
        public string PurchaserName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string PurchaserAddress { get; set; }
        public string PurchaserAddress { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string PurchaseMethod { get; set; }
        public string PurchaseMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime TimePlanToImplement { get; set; }
        public DateTime TimePlanToImplement { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int MergeTimes { get; set; }
        public int MergeTimes { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int CreatorId { get; set; }
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime CreateDatetime { get; set; }
        public DateTime CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string BudgetName { get; set; }
        public string BudgetName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string BudgetTypeName { get; set; }
        public string BudgetTypeName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsFinancialCapital { get; set; }
        public bool? IsFinancialCapital { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int TotalDeclareAmount { get; set; }
        public int? TotalDeclareAmount { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int TotalBudgetAmount { get; set; }
        public int? TotalBudgetAmount { get; set; }
        
          
        #endregion
	}
}