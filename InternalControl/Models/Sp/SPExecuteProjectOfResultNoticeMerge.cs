using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPExecuteProjectOfResultNoticeMerge[类]
    /// </summary>
    [Serializable]
	public class SPExecuteProjectOfResultNoticeMerge 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public DataTable List { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable ListOfPackageOfResultNotice { get; set; }
        
          
        #endregion
	}
}