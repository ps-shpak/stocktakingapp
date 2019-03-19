FROM stocktakingbackendbuilder AS builder

ADD stocktakingapi /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingapi
ADD stocktakingbackend /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend
WORKDIR /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend

RUN make

FROM debian:stretch

COPY --from=builder /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend/build/stocktakingbackend /usr/bin/stocktakingbackend

CMD [ "/usr/bin/stocktakingbackend" ]
