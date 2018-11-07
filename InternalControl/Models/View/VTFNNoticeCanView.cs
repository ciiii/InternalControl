using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VTFNNoticeCanView[类]
    /// </summary>
    [Serializable]
	public partial class VTFNNoticeCanView 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Type { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int SendorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string FilePath { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Content { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool IsEnabled { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Remark { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string SendorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? SendorDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string SendorDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string SendorRoleName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int IsReceived { get; set; }
        
          
        #endregion
	}
}