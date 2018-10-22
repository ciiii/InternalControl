using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPStepAssignedEmployeeAdd[类]
    /// </summary>
    [Serializable]
	public class SPStepAssignedEmployeeAdd 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public int NextStepId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable EmpIdList { get; set; }
        
          
        #endregion
	}
}