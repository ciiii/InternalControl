using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VExecuteProject[类]
    /// </summary>
    [Serializable]
	public partial class VExecuteProject 
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
		//public string ProjectNumber { get; set; }
        public string ProjectNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int SourceBudgetProjectId { get; set; }
        public int SourceBudgetProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int Year { get; set; }
        public int Year { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Name { get; set; }
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ProjectType { get; set; }
        public string ProjectType { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string MergeTypeWhenExecute { get; set; }
        public string MergeTypeWhenExecute { get; set; }
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
		//public DateTime TimeToImplement { get; set; }
        public DateTime? TimeToImplement { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool ISCenterPurchase { get; set; }
        public bool ISCenterPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsGovernmentPurchase { get; set; }
        public bool? IsGovernmentPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string PurchaseMethod { get; set; }
        public string PurchaseMethod { get; set; }
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
		//public int CeilingPrice { get; set; }
        public int? CeilingPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string InspectionMethods { get; set; }
        public string InspectionMethods { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ContractTerms { get; set; }
        public string ContractTerms { get; set; }
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
		//public int ExecutionModeId { get; set; }
        public int? ExecutionModeId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int TotalBudgetAmount { get; set; }
        public int? TotalBudgetAmount { get; set; }
        
          
        #endregion
	}
}