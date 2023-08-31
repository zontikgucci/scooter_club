import { сonfigFTP } from '../config/ftp.js'
import vinylFTP from 'vinyl-ftp'
import util from 'gulp-until'

export const ftp = () => {
	
	сonfigFTP.log = util.log
	const ftpConnect = vinylFTP.create(сonfigFTP)

	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'FTP',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))
}