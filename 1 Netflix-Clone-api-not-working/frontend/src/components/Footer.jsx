const Footer = () => {
	return (
		<footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
			<div className='flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
				{/* Footer text with links */}
				<p className='text-center text-sm text-muted-foreground md:text-left'>
					Built by{" "}
					{/* Link to personal GitHub */}
					<a
						href='https://github.com/krimisha-18/netflix-clone'
						target='_blank'
						className='font-medium underline'
					>
						krimisha-18
					</a>
					. The source code is available on{" "}
					{/* Link to GitHub repository */}
					<a
						href='https://github.com/krimisha-18/netflix-clone'
						target='_blank'
						rel='noreferrer'
						className='font-medium underline'
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
