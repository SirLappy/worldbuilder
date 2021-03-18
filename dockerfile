FROM hayd/alpine-deno:1.7.2

# The port that your application listens to.
EXPOSE 1993

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

# need to be root to install denon
USER root
#RUN deno install --allow-read --allow-run --allow-write --allow-net -f --unstable https://deno.land/x/denon@v2.2.0/denon.ts
#RUN deno install -qA -f --unstable https://deno.land/x/denon@2.3.2/denon.ts
RUN deno install -qAf --unstable https://raw.githubusercontent.com/denosaurs/denon/main/denon.ts

ENTRYPOINT ["/usr/local/bin/denon"]

USER deno

CMD ["run", "--allow-net", "main.ts"]
