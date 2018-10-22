using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VDeclareProject[类]
    /// </summary>
    [Serializable]
	public partial class VDeclareProject 
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
		//public string PlanPurchaseMethod { get; set; }
        public string PlanPurchaseMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime DateOfPlanToImplement { get; set; }
        public DateTime DateOfPlanToImplement { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Reason { get; set; }
        public string Reason { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Attachment { get; set; }
        public string Attachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int CreatorId { get; set; }
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string CreatorName { get; set; }
        public string CreatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int DeclareDepartmentId { get; set; }
        public int? DeclareDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string DeclareDepartmentName { get; set; }
        public string DeclareDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime CreateDatetime { get; set; }
        public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        
          
        #endregion
	}
}