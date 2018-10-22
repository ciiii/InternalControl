using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VExecuteProjectOfGetRunMode[类]
    /// </summary>
    [Serializable]
	public partial class VExecuteProjectOfGetRunMode 
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
		//public int ExecutionModeId { get; set; }
        public int ExecutionModeId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ExecutionModeName { get; set; }
        public string ExecutionModeName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int AgencyId { get; set; }
        public int? AgencyId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string AgencyName { get; set; }
        public string AgencyName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int AgencyLinkmanId { get; set; }
        public int? AgencyLinkmanId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string AgencyLinkmanNumber { get; set; }
        public string AgencyLinkmanNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string AgencyLinkmanName { get; set; }
        public string AgencyLinkmanName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string AgencyContacgWay { get; set; }
        public string AgencyContacgWay { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string AgencyContactNumber { get; set; }
        public string AgencyContactNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string AgencyAddress { get; set; }
        public string AgencyAddress { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string AgencyProxyModel { get; set; }
        public string AgencyProxyModel { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime BeginDatetimeOfAgent { get; set; }
        public DateTime? BeginDatetimeOfAgent { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime EndDatetimeOfAgent { get; set; }
        public DateTime? EndDatetimeOfAgent { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int AgencyComprehensiveScore { get; set; }
        public int? AgencyComprehensiveScore { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int CreatorId { get; set; }
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime CreateDatetime { get; set; }
        public DateTime CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        
          
        #endregion
	}
}