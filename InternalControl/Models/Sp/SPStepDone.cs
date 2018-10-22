using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPStepDone[类]
    /// </summary>
    [Serializable]
	public class SPStepDone 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public int StepId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int State { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int OperatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public string Remark { get; set; }
        
          
        #endregion
	}
}