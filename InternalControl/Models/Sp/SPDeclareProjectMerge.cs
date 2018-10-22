using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPDeclareProjectMerge[类]
    /// </summary>
    [Serializable]
	public class SPDeclareProjectMerge 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public DataTable List { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable PackageList { get; set; }
        
          
        #endregion
	}
}