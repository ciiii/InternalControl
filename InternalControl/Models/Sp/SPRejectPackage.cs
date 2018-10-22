using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPRejectPackage[类]
    /// </summary>
    [Serializable]
	public class SPRejectPackage 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public int ExecuteProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable PackageIdList { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int EmpId { get; set; }
        
          
        #endregion
	}
}