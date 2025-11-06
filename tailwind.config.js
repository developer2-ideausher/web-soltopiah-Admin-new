/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			midxl: '1400px'
  		},
  		fontFamily: {
  			mfaCustom: ["var(--font-mfa)"],
  			inter: ["var(--font-inter)"]
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
  			transparent: 'transparent',
  			current: 'currentColor',
  			white: '#ffffff',
  			black: '#000',
  			black2: '#333333',
  			primary: '#232946',
  			'primary-light': '#2E2E37',
  			bg: '#E9EBF7',
  			pink: '#F0C2C9',
  			deepBlue: '#393E59',
  			userblack: '#17161D'
  		},
  		gridTemplateColumns: {
  			userTable: '240px 250px 150px 150px 180px 100px',
  			userParticipatedTable: '258px 500px 150px 250px 200px ',
  			userChallengeCreatedTable: '298px 500px 200px 250px 200px 80px ',
  			userCommunityParticipatedTable: '258px 500px 250px 150px 100px 100px ',
  			userCommunityCreatedTable: '300px 500px 150px',
  			userFriendsTable: '300px 200px 150px 150px',
  			userVideoTable: '200px 350px 250px 150px 150px 100px',
  			guideVideoTable: '300px 350px 250px 150px 150px 100px',
  			userAudioTable: '350px 450px 200px 200px 100px ',
			userCourses : '300px 200px 200px 100px',
  			guideTable: '288px 301px 152px 150px 100px 140px 40px',
  			guideTable1: '288px 301px 252px 150px 100px 140px 100px 40px',
  			contentTable: '408px 400px 200px 200px 150px 150px 100px ',
  			contentSinglesTable: '350px  200px 200px 150px 150px 100px ',
  			categoryTable: '258px 320px 382px 168px 150px 150px 50px',
  			categoryMainTable: '300px 170px 200px 152px 158px 50px ',
  			quickreadsMainTable: '320px 220px 200px  100px 100px ',
  			LiveMainTable: '250px 200px 150px 100px 100px  100px',
  			earning: '200px 100px 150px 150px  ',
  			earningSession: '250px 200px 100px 150px  ',
  			userGuideTable: '150px 100px 100px 200px  100px 100px',
  			LiveReqTable: '280px 300px 280px 250px ',
  			calmnessTable: '300px 200px 200px 150px 200px 100px ',
  			subscriptionTable: '250px 200px 100px 100px 100px 100px 80px 80px',
  			communityTable: '300px 350px 120px 220px 100px 180px ',
  			communityDetailsTable: '350px 250px 220px 220px 100px ',
  			revenueTable: '200px 350px 250px 250px 250px 180px 50px',
  			notificationTable: '200px 400px 200px 100px',
  			badgeTable: '300px 300px 200px 50px ',
  			challengeTable: '400px 400px 150px 150px 150px 150px 100px 200px 50px',
  			sessionTable: '120px 150px 180px 150px 120px 130px 150px 150px 100px',
  			liveCreatedTable: '200px 200px 200px 300px 100px ',
  			quickreadsTable: '400px 250px 250px 300px 100px ',
  			quickReadsRequestTable: '350px 280px 250px  150px 50px ',
  			contentUploadedTable: '300px 300px 150px 80px 80px  ',
  			testTable: '300px 300px 150px 120px 80px 80px  ',
  			userInviteTable: '200px 280px 150px 120px  150px 150px 150px 80px  ',
  		},
  		fontSize: {
  			xl2: '22px'
  		},
  		// borderRadius: {
  		// 	lg: 'var(--radius)',
  		// 	md: 'calc(var(--radius) - 2px)',
  		// 	sm: 'calc(var(--radius) - 4px)'
  		// }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
