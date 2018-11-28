using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPExecuteProjectOfCorrectionMerge[类]
    /// </summary>
    [Serializable]
	public class SPExecuteProjectOfCorrectionMerge 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public DataTable List { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable ListOfPackageOfResultNoticeOfCorrection { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable RejectPackageIdList { get; set; }
        
          
        #endregion
	}
}