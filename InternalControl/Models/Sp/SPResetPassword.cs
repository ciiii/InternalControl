using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPResetPassword[类]
    /// </summary>
    [Serializable]
	public class SPResetPassword 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public string WordNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public string OldPassword { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public string NewPassword { get; set; }
        
          
        #endregion
	}
}