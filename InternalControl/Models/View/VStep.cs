using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VStep[类]
    /// </summary>
    [Serializable]
	public partial class VStep 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int FlowTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int FlowId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int StepTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string StepTemplateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string VIewComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string EditComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Style { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int State { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string StateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? OperatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string OperatorWorkNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string OperatorPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string OperatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? OperatorDpartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string OperatorDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? OperatorDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Remark { get; set; }
        
          
        #endregion
	}
}