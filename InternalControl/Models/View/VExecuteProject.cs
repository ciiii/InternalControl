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
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ProjectNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int SourceBudgetProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int Year { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ProjectType { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string MergeTypeWhenExecute { get; set; }
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
        public DateTime? TimeToImplement { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsGovernmentPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PurchaseMethod { get; set; }
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
        public string LinkmanName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LinkmanPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? CeilingPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string InspectionMethods { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ContractTerms { get; set; }
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
        public int? ExecutionModeId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? TotalExecuteAmount { get; set; }
        
          
        #endregion
	}
}