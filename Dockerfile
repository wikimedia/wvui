FROM docker-registry.wikimedia.org/nodejs10-devel
RUN apt-get update && \
	apt-get install -y \
		build-essential \
		# ca-certificates \
		python-pkgconfig \
		git
RUN npm install
